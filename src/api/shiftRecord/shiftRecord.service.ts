import { omit as _omit, uniq as _uniq } from "lodash";
import { Op } from "sequelize";
import moment from "moment";

import makeMoment from "../../components/moment";
import ShiftRecordModel from "./shiftRecord.model";
import {
  CreateShiftRecordInBulkProps,
  CreateShiftRecordProps,
  UpdateShiftRecordProps,
  DeleteShiftRecordProps,
  GetShiftRecordByIdProps,
  GetShiftRecordsProps,
  PublishShiftRecordsProps,
} from "./shiftRecord.types";
import { CustomError } from "../../components/errors";
import ShiftRecordErrorCode from "./shiftRecord.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel, companyService } from "../company";
import { addCientFiltersByTeams, addStaffFiltersByTeams, getFilters } from "../../components/filters";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import {
  addTimeToDate,
  createShifts,
  formatDateToString,
  generateShiftServices,
} from "../../utils/shiftGenerator";
import { shiftRepeatService } from "../shiftRepeat";
import { shiftRecordStaffProfileService } from "./shiftRecordStaffProfile";
import { shiftRecordClientProfileService } from "./shiftRecordClientProfile";
import { shiftRecordServiceService } from "./shiftRecordService";
import { ServiceModel } from "../service";
import { TimesheetModel, timesheetService } from "../timesheet";
import { InvoiceModel, invoiceService } from "../invoice";
import { ShiftRecordStatus } from "./shiftRecord.constant";

const getTimeForSelect = (date: any, timezone: any) =>
  date ? makeMoment(date, timezone).format("HH:mm") : null;

const getStartDate = (
  existingDateTime: any,
  newDateTime: any,
  timezone: any
) => {
  const formatedDate = formatDateToString(existingDateTime, timezone);
  const formatedTime = getTimeForSelect(newDateTime, timezone);
  const finalDateTime = formatedDate + " " + formatedTime;
  return makeMoment(finalDateTime, timezone);
};

const getDateDiff = (startDate: any, endDate: any, timezone: any) => {
  return moment
    .duration(
      makeMoment(endDate, timezone).diff(makeMoment(startDate, timezone))
    )
    .asMinutes();
};
class ShiftRecordService {
  async createShiftRecordInBulk(props: CreateShiftRecordInBulkProps) {
    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    const createProps = createShifts({
      ...props,
      timezone: companyData.timezone,
    });

    const shiftRepeat = await shiftRepeatService.createShiftRepeat({
      meta: props.repeat,
      company: props.company,
    });

    const bulkCreateProps = createProps.map((shift) => {
      return { ...shift, repeat: shiftRepeat.id };
    });

    // Create a shiftRecords in bulk
    const shiftRecords = await ShiftRecordModel.bulkCreate(bulkCreateProps);

    for (let index = 0; index < shiftRecords.length; index++) {
      const shiftRecord = shiftRecords[index];

      const shiftServices = generateShiftServices(
        shiftRecord,
        props,
        companyData.timezone
      );

      await shiftRecordServiceService.createBulkShiftRecordService({
        shift: shiftRecord.id,
        services: shiftServices,
      });

      await shiftRecordStaffProfileService.createBulkShiftRecordStaffProfile({
        shift: shiftRecord.id,
        staff: props.staff,
      });
      await shiftRecordClientProfileService.createBulkShiftRecordClientProfile({
        shift: shiftRecord.id,
        client: props.client,
      });

      // Create timesheet
      await timesheetService.createTimesheetInBulk({
        startDateTime: shiftRecord.startDateTime,
        endDateTime: shiftRecord.endDateTime,
        status: "Pending",
        shift: shiftRecord.id,
        staff: props.staff,
        company: props.company,
      });

      // Create invoices
      await invoiceService.createInvoiceInBulk({
        startDateTime: shiftRecord.startDateTime,
        endDateTime: shiftRecord.endDateTime,
        status: "Pending",
        shift: shiftRecord.id,
        client: props.client,
        company: props.company,
      });
    }

    return shiftRecords;
  }

  async createShiftRecord(props: CreateShiftRecordProps) {
    // Create a new shiftRecord
    const shiftRecord = await ShiftRecordModel.create(props);

    // Assign staff profiles
    if (props.staff && props.staff.length) {
      await shiftRecordStaffProfileService.createBulkShiftRecordStaffProfile({
        shift: shiftRecord.id,
        staff: props.staff,
      });
    }

    // Assign client profiles
    if (props.client && props.client.length) {
      await shiftRecordClientProfileService.createBulkShiftRecordClientProfile({
        shift: shiftRecord.id,
        client: props.client,
      });
    }

    // Create services
    if (props.services && props.services.length) {
      await shiftRecordServiceService.createBulkShiftRecordService({
        shift: shiftRecord.id,
        services: props.services,
      });
    }

    // Create timesheet
    await timesheetService.createTimesheetInBulk({
      startDateTime: props.startDateTime,
      endDateTime: props.endDateTime,
      status: "Pending",
      shift: shiftRecord.id,
      staff: props.staff,
      company: props.company,
    });

    // Create invoice
    await invoiceService.createInvoiceInBulk({
      startDateTime: props.startDateTime,
      endDateTime: props.endDateTime,
      status: "Pending",
      shift: shiftRecord.id,
      client: props.client,
      company: props.company,
    });

    return shiftRecord;
  }

  async updateShiftRecord(props: UpdateShiftRecordProps) {
    const companyData = await companyService.getCompanyById({
      company: props.company,
    });

    // Props
    const { id, company, updateRecurring } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find all timesheets
    const timesheets = await TimesheetModel.findAll({
      where: { shift: id, company },
    });

    if (timesheets.length > 0) {
      // Checking that if any timesheet is approved or not
      const timesheetApproved = timesheets.some(
        (timesheet) => timesheet.status === "Approved"
      );

      if (timesheetApproved) {
        throw new CustomError(
          404,
          ShiftRecordErrorCode.TIMESHEET_ALREADY_APPROVED
        );
      }
    }

    // Find all invoices
    const invoices = await InvoiceModel.findAll({
      where: { shift: id, company },
    });

    if (invoices.length > 0) {
      // Checking that if any invoice is approved or not
      const invoiceApproved = invoices.some(
        (invoice) => invoice.status === "Approved"
      );

      if (invoiceApproved) {
        throw new CustomError(
          404,
          ShiftRecordErrorCode.INVOICE_ALREADY_APPROVED
        );
      }
    }

    // Find shiftRecord by id and company
    const shiftRecord = await ShiftRecordModel.findOne({
      where: { id, company },
    });

    // if shiftRecord not found, throw an error
    if (!shiftRecord) {
      throw new CustomError(404, ShiftRecordErrorCode.SHIFT_RECORD_NOT_FOUND);
    }

    let result = {};

    if (updateRecurring && shiftRecord.repeat) {
      // Update the repeat shiftRecords
      const shiftRecords = await ShiftRecordModel.findAll({
        where: {
          company,
          repeat: shiftRecord.repeat,
          startDateTime: { [Op.gte]: shiftRecord.startDateTime },
        },
      });

      if (shiftRecords.length > 0) {
        const dateDiff = getDateDiff(
          updateProps.startDateTime,
          updateProps.endDateTime,
          companyData.timezone
        );

        shiftRecords.forEach(async (shift) => {
          const getStartTime = getStartDate(
            shift.id === id ? updateProps.startDateTime : shift.startDateTime,
            updateProps.startDateTime,
            companyData.timezone
          );

          // Just add the dateDiff to new start time
          const getEndTime = addTimeToDate(
            getStartTime,
            dateDiff,
            "minutes",
            companyData.timezone
          );

          const newProps = {
            ...updateProps,
            startDateTime: getStartTime,
            endDateTime: getEndTime,
          };
          await ShiftRecordModel.update(newProps, {
            where: { id: shift.id, company: shift.company },
            returning: true,
          });
          const shiftServices = generateShiftServices(
            shift,
            props,
            companyData.timezone
          );
          // Update services
          if (props.services && props.services.length) {
            await shiftRecordServiceService.updateBulkShiftRecordService({
              shift: shift.id,
              services: shiftServices,
            });
          }

          // Assign staff profiles
          if (props.staff) {
            await shiftRecordStaffProfileService.updateBulkShiftRecordStaffProfile(
              {
                shift: shift.id,
                staff: props.staff,
              }
            );
          }

          // Assign client profiles
          if (props.client) {
            await shiftRecordClientProfileService.updateBulkShiftRecordClientProfile(
              {
                shift: shift.id,
                client: props.client,
              }
            );
          }

          // Update timesheets
          await timesheetService.updateTimesheetOnShiftUpdate({
            startDateTime: getStartTime as any,
            endDateTime: getEndTime as any,
            shift: shift.id,
            staff: props.staff,
            company: props.company,
          });

          // Update invoices
          await invoiceService.updateInvoiceOnShiftUpdate({
            startDateTime: getStartTime as any,
            endDateTime: getEndTime as any,
            shift: shift.id,
            client: props.client,
            company: props.company,
          });
        });
      }
    } else {
      // Update the single shiftRecord
      const [, [updatedShiftRecord]] = await ShiftRecordModel.update(
        updateProps,
        {
          where: { id, company },
          returning: true,
        }
      );
      result = updatedShiftRecord;

      // Update services
      if (props.services && props.services.length) {
        await shiftRecordServiceService.updateBulkShiftRecordService({
          shift: shiftRecord.id,
          services: props.services,
        });
      }

      // Assign staff profiles
      if (props.staff) {
        await shiftRecordStaffProfileService.updateBulkShiftRecordStaffProfile({
          shift: shiftRecord.id,
          staff: props.staff,
        });
      }

      // Assign client profiles
      if (props.client) {
        await shiftRecordClientProfileService.updateBulkShiftRecordClientProfile(
          {
            shift: shiftRecord.id,
            client: props.client,
          }
        );
      }

      // Update timesheets
      await timesheetService.updateTimesheetOnShiftUpdate({
        startDateTime: props.startDateTime,
        endDateTime: props.endDateTime,
        shift: id,
        staff: props.staff,
        company: props.company,
      });

      // Update invoices
      await invoiceService.updateInvoiceOnShiftUpdate({
        startDateTime: props.startDateTime,
        endDateTime: props.endDateTime,
        shift: id,
        client: props.client,
        company: props.company,
      });
    }

    return result;
  }

  async deleteShiftRecord(props: DeleteShiftRecordProps) {
    // Props
    const { id, company, deleteRecurring } = props;
    // Find  the shiftRecord by id and company
    const shiftRecord = await ShiftRecordModel.findOne({
      where: { id, company },
    });
    // if shiftRecord has not been found, throw an error
    if (!shiftRecord) {
      throw new CustomError(404, ShiftRecordErrorCode.SHIFT_RECORD_NOT_FOUND);
    }

    // Find all timesheets
    const timesheets = await TimesheetModel.findAll({
      where: { shift: id, company },
    });

    if (timesheets.length > 0) {
      // Checking that if any timesheet is approved or not
      const timesheetApproved = timesheets.some(
        (timesheet) => timesheet.status === "Approved"
      );

      if (timesheetApproved) {
        throw new CustomError(
          404,
          ShiftRecordErrorCode.TIMESHEET_ALREADY_APPROVED
        );
      }
    }

    // Find all invoices
    const invoices = await InvoiceModel.findAll({
      where: { shift: id, company },
    });

    if (invoices.length > 0) {
      // Checking that if any invoice is approved or not
      const invoiceApproved = invoices.some(
        (invoice) => invoice.status === "Approved"
      );

      if (invoiceApproved) {
        throw new CustomError(
          404,
          ShiftRecordErrorCode.INVOICE_ALREADY_APPROVED
        );
      }
    }

    if (deleteRecurring && shiftRecord.repeat) {
      // Find and delete the shiftRecords by company, has repeat and date greater than equal to that shift
      const shiftRecords = await ShiftRecordModel.destroy({
        where: {
          company,
          repeat: shiftRecord.repeat,
          startDateTime: { [Op.gte]: shiftRecord.startDateTime },
        },
      });
      return shiftRecords;
    } else {
      // Find and delete the shiftRecord by id and company
      const shiftRecord = await ShiftRecordModel.destroy({
        where: { id, company },
      });
      return shiftRecord;
    }
  }

  async getShiftRecordById(props: GetShiftRecordByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the shiftRecord by id and company
    const shiftRecord = await ShiftRecordModel.findOne({
      where: { id, company },
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
    });

    // If no shiftRecord has been found, then throw an error
    if (!shiftRecord) {
      throw new CustomError(404, ShiftRecordErrorCode.SHIFT_RECORD_NOT_FOUND);
    }

    return shiftRecord;
  }

  async getShiftRecords(props: GetShiftRecordsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);
    const staffFilters = await addStaffFiltersByTeams(userId, company);

    const INCLUDES = {
      COMPANY: {
        model: CompanyModel,
      },
      SERVICE: {
        model: ServiceModel,
        through: {
          attributes: ["start_time"], //TODO: We need to do some cleanup here
        },
      },
      STAFF: {
        model: StaffProfileModel,
      through: {
        attributes: [],
      },
      where:{
        ...filters["Staff"],
      },
      as: "Staff",
      duplicating: true,
      },
      CLIENT: {
        model: ClientProfileModel,
        through: {
          attributes: [],
        },
        as: "Client",
        duplicating: true,
      }
    }

    const include = [
        {
          ...INCLUDES.COMPANY,
        },
        {
          ...INCLUDES.STAFF,
          required: false,
        },
        {
          ...INCLUDES.CLIENT,
          required: false,
        },
        {
          ...INCLUDES.SERVICE,
        }
    ];

    // Helper fn. to return shifts by staff when called by myshift endpoint's controller
    const shouldApplyFilters = () => {
    
      const hasStaffFilter=(filters["Staff"] && Object.keys(filters["Staff"]).length !== 0)||(staffFilters&&Object.keys(staffFilters).length !== 0);
      const hasClientFilter=(filters["Client"] && Object.keys(filters["Client"]).length !== 0)||(clientFilters&&Object.keys(clientFilters).length !== 0);

      return hasStaffFilter||hasClientFilter;
    };

    const clientFilters = await addCientFiltersByTeams(userId, company);

    if(shouldApplyFilters())
    {
      const includeForStaff=[
        {
          ...INCLUDES.COMPANY
        },
        {
          ...INCLUDES.STAFF,
          where: {
            ...filters["Staff"],
            ...staffFilters,
          },
          as: "Staff",
          required: false,
        },
        {
          ...INCLUDES.CLIENT,
          required: false,
        },
        {
          ...INCLUDES.SERVICE,
        },
      ];
      // Find all shiftRecords for matching props and company
      const shiftsWithStaff = await ShiftRecordModel.findAll({
        // offset, We don't need pagination for this endpoint
        // limit,
        order,
        where: {
          company,
          ...filters["primaryFilters"],
        },
        include:includeForStaff,
      });

      const includeForClient = [
        {
          ...INCLUDES.COMPANY,
        },
        {
          ...INCLUDES.STAFF,
          required: false,
        },
        {
          ...INCLUDES.CLIENT,
          where: {
            ...filters["Client"],
            ...clientFilters,
          },
          required: false,
        },
        {
          ...INCLUDES.SERVICE,
        },
      ];

      // Find all shiftRecords for matching props and company
      const shiftsWithClient = await ShiftRecordModel.findAll({
        // offset, We don't need pagination for this endpoint
        // limit,
        order,
        where: {
          company,
          ...filters["primaryFilters"],
        },
        include:includeForClient,
      });

      const shiftIdsOfStaff=shiftsWithStaff.map(shift=>shift.id);
      const shiftIdsOfClients=shiftsWithClient.map(shift=>shift.id);

      const totalShiftsInclude = [
        {
          ...INCLUDES.COMPANY,
        },
        {
          ...INCLUDES.STAFF,
        },
        {
          ...INCLUDES.CLIENT,
        },
        {
          ...INCLUDES.SERVICE,
        }
      ]

      const allShiftIds=_uniq([...shiftIdsOfStaff,...shiftIdsOfClients]);
       // Find all shiftRecords for matching props and company
       const finalShiftRecords = await ShiftRecordModel.findAll({
        // offset, We don't need pagination for this endpoint
        // limit,
        order,
        where: {
          company,
          id:allShiftIds,
          ...filters["primaryFilters"],
        },
        include:totalShiftsInclude,
      });
      const response = getPagingData({ count:finalShiftRecords.length, rows: finalShiftRecords }, page, limit);
      return response;
    }

    // Count total shiftRecords in the given company
    const count = await ShiftRecordModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all shiftRecords for matching props and company
    const data = await ShiftRecordModel.findAll({
      // offset, We don't need pagination for this endpoint
      // limit,
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

  async getMyShiftRecords(props: GetShiftRecordsProps, userId: string) {
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
        through: {
          attributes: [],
        },
        where:{
          ...filters["Staff"],
        },
        as: "Staff",
        duplicating: true,
        required: false,
        right:true,
      },
      {
        model: ClientProfileModel,
        through: {
          attributes: [],
        },
        as: "Client",
        duplicating: true,
        required: false,
      },
      {
        model: ServiceModel,
        through: {
          attributes: ["start_time"], //TODO: We need to do some cleanup here
        },
      },
    ];

    // Count total shiftRecords in the given company
    const count = await ShiftRecordModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all shiftRecords for matching props and company
    const data = await ShiftRecordModel.findAll({
      // offset, We don't need pagination for this endpoint
      // limit,
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

  async publishShiftRecords(props: PublishShiftRecordsProps) {
    const { company, shiftIds, status } = props;
    const [numberOfShifts, []] = await ShiftRecordModel.update(
      { status },
      {
        where: {
          id: {
            [Op.in]: shiftIds,
          },
          company,
        },
        returning: true,
      }
    );
    return {
      numberOfShifts,
      status: status,
    };
  }
}

export default new ShiftRecordService();
