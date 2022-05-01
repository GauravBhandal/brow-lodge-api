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
import { CompanyModel, companyService } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel } from "../clientProfile";
import { ServiceModel } from "../service";
import { Invoice, Invoices } from "xero-node";
import xero from "../../components/xero";
import { getMinutesDiff } from "../../utils/shiftGenerator";
import { xeroService } from "../xero";
import { Timesheet } from "xero-node/dist/gen/model/payroll-au/timesheet";

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
          },
        ],
      },
    ];
    const timesheets = await TimesheetModel.findAll({
      where: { id: ids, company },
      include,
    });
    console.log("timesheets", timesheets);
    let result: any = {};
    timesheets.forEach((timesheet: any) => {
      timesheet.Shift.Staff.forEach((staff: any) => {
        const services = timesheet.Shift.Services;
        if (!result[staff.accountingCode]) {
          result[staff.accountingCode] = {};
        }
        result[staff.accountingCode][services[0]?.code] =
          (result[staff.accountingCode][services[0]?.code] || 0) +
          getMinutesDiff(timesheet.startDateTime, timesheet.endDateTime) / 60;

        if (services.length === 2) {
          result[staff.accountingCode][services[1]?.code] =
            (result[staff.accountingCode][services[1]?.code] || 0) +
            getMinutesDiff(services[1]?.start_time, timesheet.endDateTime) / 60;
        }
      });
    });

    // TODO: Fix these dates
    const dateValue = "2020-10-10"; // Should be today's date
    const dueDateValue = "2020-10-28"; // Should be today's date + 14 days

    const getLineItems = (services: any) => {
      const finalLineItems = Object.keys(services).map((service) => ({
        quantity: services[service],
        itemCode: service,
      }));
      return finalLineItems;
    };

    const timesheetData: any = [
      {
        employeeID: "5cde0289-56a7-4139-a14c-d0d1fbb8573c",
        startDate: "/Date(1573603200000+0000)/",
        endDate: "/Date(1573603200000+0000)/",
        status: "DRAFT",
        timesheetLines: [
          {
            earningsRateID: "6c1db981-e6a2-4f37-879a-2cb0235341bf",
            numberOfUnits: [8.0],
          },
        ],
      },
    ];
    // Object.keys(result).forEach((staffId) => {
    //   const invoice: Invoice = {
    //     type: Invoice.TypeEnum.ACCREC,
    //     contact: {
    //       contactID: staffId,
    //     },
    //     date: dateValue,
    //     dueDate: dueDateValue,
    //     lineItems: getLineItems(result[staffId]),
    //     status: Invoice.StatusEnum.DRAFT,
    //   };
    //   invoiceData.push(invoice);
    // });

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
