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
  GenerateTimesheetsProps,
  GetTimesheetByIdsProps,
  Timesheet,
} from "./timesheet.types";
import { CustomError } from "../../components/errors";
import TimesheetErrorCode from "./timesheet.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { Company, CompanyModel } from "../company";
import { StaffProfile, StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";
import { ShiftRecordModel } from "../shiftRecord";
import { ClientProfileModel } from "../clientProfile";
import { ServiceModel } from "../service";
import {
  getMinutesDiff,
  daysDifference,
  formatDateToString,
} from "../../utils/shiftGenerator";
import { xeroService } from "../xero";
import { PayLevelModel } from "../payLevel";

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

  async getTimesheets(props: GetTimesheetsProps) {
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

  async _getTimesheetByIds(props: GetTimesheetByIdsProps) {
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

    return timesheets;
  }

  // Helper function to convert the given timesheets to the format supported by Xero
  _getFormattedTimesheetsForXero(
    timesheets: Timesheet[],
    startDate: Date,
    endDate: Date
  ) {
    /*
     Creating an empty object to store the staff and payitem details e.g.
     result = {
       accountingCode: {
         payItemId1: [Total Units for each day],
        payItemId2: [Total Units for each day],
       }
     } 
    */
    let result: any = {};

    // Map the total hours for per staff per pay item
    timesheets.forEach((timesheet: any) => {
      if (timesheet?.Shift?.Staff) {
        // For every staff in the Shift, add total hours per pay item
        timesheet.Shift.Staff.forEach((staff: StaffProfile) => {
          if (staff?.Paylevel?.id && timesheet?.Shift?.Services) {
            const paylevelId = staff.Paylevel.id;
            const services = timesheet.Shift.Services;

            // For every service in the Shift
            services.forEach((service: any, index: any) => {
              const payLevel = service.PayLevels.find(
                (level: any) => level.id === paylevelId
              );
              const payItem = payLevel.services_pay_levels.dataValues.payitem; //TODO: Please remove data values

              if (staff.accountingCode) {
                if (!result[staff.accountingCode]) {
                  result[staff.accountingCode] = {};
                }
                if (!result[staff.accountingCode][payItem]) {
                  result[staff.accountingCode][payItem] = [];
                }
                result[staff.accountingCode][payItem].push({
                  units:
                    service.rateType === "Fixed"
                      ? 1
                      : getMinutesDiff(
                          service.shift_records_services.dataValues.start_time,
                          index === services.length - 1
                            ? timesheet.endDateTime
                            : services[index + 1].shift_records_services
                                .dataValues.start_time
                        ) / 60,
                  startDate: timesheet.startDateTime,
                });
              }
            });
          }
        });
      }
    });

    const formattedTimesheets: any = [];
    const totalDaysOfShift = daysDifference(startDate, endDate);
    const defaultUnits: number[] = [];
    for (let i = 0; i <= totalDaysOfShift; i++) {
      defaultUnits.push(0);
    }
    Object.keys(result).forEach((staffId) => {
      const timesheet: any = {
        employeeID: staffId,
        startDate: formatDateToString(startDate),
        endDate: formatDateToString(endDate),
        status: "DRAFT",
        timesheetLines: Object.keys(result[staffId]).map((payItem) => {
          const units = defaultUnits;
          result[staffId][payItem].forEach((item: any) => {
            units[daysDifference(startDate, item.startDate)] = item.units;
          });
          return {
            earningsRateID: payItem,
            numberOfUnits: units,
          };
        }),
      };
      formattedTimesheets.push(timesheet);
    });

    return formattedTimesheets;
  }

  // Helper fn to check the accounting code, pay level and pay item used in every timesheet
  async _getErrorMessages(timesheets: Timesheet[], company: Company["id"]) {
    // List of accounting codes
    const getAllAccountCodes = await xeroService.getXeroEmployees({ company });

    // Payitems list stored in xero
    const payItemsList = await xeroService.getPayItems({ company });

    // Details of all the error messages
    const errorMessageDetails: any = [];

    timesheets.forEach((timesheet: any) => {
      if (timesheet?.Shift?.Staff) {
        // For every staff in the Shift, add total hours per pay item
        timesheet.Shift.Staff.forEach((staff: StaffProfile) => {
          // To check if accounting code exists or not
          if (!staff.accountingCode) {
            errorMessageDetails.push(
              `${staff.preferredName} has no accouting code`
            );
          } else {
            if (
              getAllAccountCodes?.employees &&
              getAllAccountCodes?.employees.length
            ) {
              // If accounting code present in xero also or not
              const IsAccountingCodeValid =
                getAllAccountCodes?.employees.filter(
                  (employee: any) =>
                    employee.employeeID === staff.accountingCode
                );
              if (IsAccountingCodeValid.length === 0) {
                errorMessageDetails.push(
                  `${staff.preferredName} accounting code doesn't matched`
                );
              }
            } else {
              errorMessageDetails.push("Please sync with xero");
            }
          }
          const paylevelId = staff.Paylevel;
          // Checking if paylevel is assigned to staff
          if (!paylevelId) {
            errorMessageDetails.push(`${staff.preferredName} has no paylevel`);
          }
          if (staff?.Paylevel?.id && timesheet?.Shift?.Services) {
            const paylevelId = staff.Paylevel.id;
            const services = timesheet.Shift.Services;

            // For every service in the Shift
            services.forEach((service: any, index: any) => {
              const payItem = service.PayLevels.filter(
                (level: any) => level.id === paylevelId
              );
              // Check that payitem exists
              if (!payItem) {
                errorMessageDetails.push(
                  `${staff.preferredName} has no payitem`
                );
              } else {
                if (
                  payItemsList?.payItems?.earningsRates &&
                  payItemsList?.payItems?.earningsRates.length
                ) {
                  const payItemExists =
                    payItemsList?.payItems?.earningsRates.filter(
                      (item: any) => item.earningsRateID === payItem
                    );

                  // Check that payitem matches with xero
                  if (payItemExists?.length === 0) {
                    errorMessageDetails.push(
                      `${staff.preferredName} payitem doesn't matched`
                    );
                  }
                } else {
                  errorMessageDetails.push(`Please sync with xero`);
                }
              }
            });
          }
        });
      }
    });
    return errorMessageDetails;
  }

  async generateTimesheets(props: GenerateTimesheetsProps) {
    // Props
    const { ids, company, startDate, endDate } = props;

    // Find all the timesheets for given company and ids
    const timesheets = await this._getTimesheetByIds({ ids, company });

    // Called a helper fn to check the accounting code, pay level and pay item used in every timesheet
    const getErrorMessages = await this._getErrorMessages(timesheets, company);

    if (getErrorMessages.length > 0) {
      throw new CustomError(404, getErrorMessages.toString());
    }

    // Convert the timesheets to the format supported by Xero
    const formatedTimesheets = this._getFormattedTimesheetsForXero(
      timesheets,
      startDate,
      endDate
    );

    await xeroService.exportTimesheetToXero({
      company,
      timesheets: formatedTimesheets,
    });

    await this.updateTimesheetStatus({
      company,
      ids,
      status: "Approved",
      lastExportedOn: new Date(),
    });

    return {};
  }
}

export default new TimesheetService();
