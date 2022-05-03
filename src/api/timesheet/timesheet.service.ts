import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import TimesheetModel from "./timesheet.model";
import {
  CreateTimesheetProps,
  UpdateTimesheetProps,
  DeleteTimesheetProps,
  GetTimesheetByIdProps,
  GetTimesheetsProps,
  UpdateTimesheetOnShiftUpdateProps,
  UpdateTimesheetStatusProps,
  GenerateInvoicesProps,
} from "./timesheet.types";
import { CustomError } from "../../components/errors";
import TimesheetErrorCode from "./timesheet.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel } from "../clientProfile";
import { ServiceModel } from "../service";
import { getMinutesDiff } from "../../utils/shiftGenerator";
import { xeroService } from "../xero";
import { PayLevelModel } from "../payLevel";
import moment from "moment";

class TimesheetService {
  async createTimesheetInBulk(props: CreateTimesheetProps) {
    const createProps = props.staff.map((singleStaff) => ({
      ...props,
      staff: singleStaff,
    }));

    const timesheet = await TimesheetModel.bulkCreate(createProps);
    return timesheet;
  }

  async updateTimesheet(props: UpdateTimesheetProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find timesheet by id and company
    const timesheet = await TimesheetModel.findOne({
      where: { id, company },
    });

    // if timesheet not found, throw an error
    if (!timesheet) {
      throw new CustomError(404, TimesheetErrorCode.TIMESHEET_NOT_FOUND);
    }

    // Finally, update the timesheet
    const [, [updatedTimesheet]] = await TimesheetModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });
    return updatedTimesheet;
  }

  async updateTimesheetStatus(props: UpdateTimesheetStatusProps) {
    // Props
    const { ids, company, status, lastExportedOn } = props;
    const updateProps = { status, lastExportedOn };

    // Finally, update the timesheet
    const [, [updatedTimesheet]] = await TimesheetModel.update(updateProps, {
      where: {
        id: {
          [Op.or]: ids,
        },
        company,
      },
      returning: true,
    });
    return updatedTimesheet;
  }

  async generateInvoices(props: GenerateInvoicesProps) {
    // Props
    const { ids, company } = props;

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: ShiftRecordModel,
        as: "Shift",
        include: [
          {
            model: CompanyModel,
          },
          {
            model: StaffProfileModel,
            through: {
              attributes: [],
            },
            as: "Staff",
            include: [
              {
                model: PayLevelModel,
                as: "Paylevel",
              },
            ],
          },
          {
            model: ClientProfileModel,
            through: {
              attributes: [],
            },
            as: "Client",
          },
          {
            model: ServiceModel,
            through: {
              attributes: ["start_time"], //TODO: We need to do some cleanup here
            },
            include: [
              {
                model: PayLevelModel,
                through: {
                  attributes: ["payitem"], //TODO: We need to do some cleanup here
                },
              },
            ],
          },
        ],
      },
    ];
    const timesheets = await TimesheetModel.findAll({
      where: { id: ids, company },
      include,
    });
    let result: any = {};
    timesheets.forEach((timesheet: any) => {
      timesheet.Shift.Staff.forEach((staff: any) => {
        const paylevelId = staff.Paylevel[0].id;
        const services = timesheet.Shift.Services;
        const payItem = services[0].PayLevels.find(
          (level: any) => level.id === paylevelId
        );
        if (!payItem) {
          //errror
        }
        const payItemId = payItem.services_pay_levels.dataValues.payitem; //TODO: Please remove data values
        if (!result[staff.accountingCode]) {
          result[staff.accountingCode] = {};
        }
        if (!result[staff.accountingCode][payItemId]) {
          result[staff.accountingCode][payItemId] = [];
        }
        result[staff.accountingCode][payItemId].push({
          units:
            getMinutesDiff(timesheet.startDateTime, timesheet.endDateTime) / 60,
          startDate: timesheet.startDateTime,
        });

        if (services.length === 2) {
          result[staff.accountingCode][payItemId].push({
            units:
              getMinutesDiff(services[1]?.start_time, timesheet.endDateTime) /
              60,
            startDate: services[1]?.start_time,
          });
        }
      });
    });

    const timesheetData: any = [];
    Object.keys(result).forEach((staffId) => {
      const timesheet: any = {
        employeeID: staffId,
        startDate: "2022-04-15", //TODO: Fix the dates
        endDate: "2022-04-28", //TODO: Fix the dates
        status: "DRAFT",
        timesheetLines: Object.keys(result[staffId]).map((payItem) => {
          const units = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          result[staffId][payItem].forEach((item: any) => {
            units[moment(item.startDate).isoWeekday()] = item.units;
          });
          return {
            earningsRateID: payItem,
            numberOfUnits: units,
          };
        }),
      };
      timesheetData.push(timesheet);
    });

    try {
      await xeroService.exportTimesheetToXero({
        company,
        timesheets: timesheetData,
      });

      await this.updateTimesheetStatus({
        company,
        ids,
        status: "Approved",
        lastExportedOn: new Date(),
      });
    } catch (err: any) {
      console.log(`Error${err}`);
      throw new CustomError(404, TimesheetErrorCode.FAILED_TO_GENERATE_INVOICE);
    }
    return {};
  }

  async updateTimesheetOnShiftUpdate(props: UpdateTimesheetOnShiftUpdateProps) {
    // Props
    const { shift, company, startDateTime, endDateTime, staff } = props;

    // Find timesheets by shift id and company
    const timesheets = await TimesheetModel.findAll({
      where: { shift, company },
    });
    // Delete all the existing timesheets for this shift
    if (timesheets.length > 0) {
      await this.deleteTimesheet({ shift, company });
    }

    // Create new timesheets on shift update
    const newTimesheets = await this.createTimesheetInBulk({
      startDateTime,
      endDateTime,
      status: "Pending",
      shift,
      staff,
      company,
    });
    return newTimesheets;
  }

  async deleteTimesheet(props: DeleteTimesheetProps) {
    // Props
    const { shift, company } = props;

    // Find and delete the timesheet by id and company
    const timesheet = await TimesheetModel.destroy({
      where: { shift, company },
    });

    // if timesheet has been deleted, throw an error
    if (!timesheet) {
      throw new CustomError(404, TimesheetErrorCode.TIMESHEET_NOT_FOUND);
    }

    return timesheet;
  }

  async getTimesheetById(props: GetTimesheetByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the timesheet by id and company
    const timesheet = await TimesheetModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no timesheet has been found, then throw an error
    if (!timesheet) {
      throw new CustomError(404, TimesheetErrorCode.TIMESHEET_NOT_FOUND);
    }

    return timesheet;
  }

  async getTimesheets(props: GetTimesheetsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
      {
        model: ShiftRecordModel,
        as: "Shift",
        where: {
          ...filters["Shift"],
        },
      },
    ];

    // Count total timesheets in the given company
    const count = await TimesheetModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all timesheets for matching props and company
    const data = await TimesheetModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new TimesheetService();
