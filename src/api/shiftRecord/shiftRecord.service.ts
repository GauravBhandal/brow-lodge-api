import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ShiftRecordModel from "./shiftRecord.model";
import {
  CreateShiftRecordInBulkProps,
  CreateShiftRecordProps,
  UpdateShiftRecordProps,
  DeleteShiftRecordProps,
  GetShiftRecordByIdProps,
  GetShiftRecordsProps,
} from "./shiftRecord.types";
import { CustomError } from "../../components/errors";
import ShiftRecordErrorCode from "./shiftRecord.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { createShifts } from "../../utils/shiftGenerator";
import { shiftRepeatService } from "../shiftRepeat";
import { shiftRecordStaffProfileService } from "./shiftRecordStaffProfile";
import { shiftRecordClientProfileService } from "./shiftRecordClientProfile";
import { shiftRecordServiceService } from "./shiftRecordService";
import { ServiceModel } from "../service";
import { TimesheetModel, timesheetService } from "../timesheet";
import { InvoiceModel, invoiceService } from "../invoice";

class ShiftRecordService {
  async createShiftRecordInBulk(props: CreateShiftRecordInBulkProps) {
    const createProps = createShifts(props);

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

      await shiftRecordServiceService.createBulkShiftRecordService({
        shift: shiftRecord.id,
        services: props.services,
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
    // Props
    const { id, company } = props;
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

    // Update the shiftRecord
    const [, [updatedShiftRecord]] = await ShiftRecordModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

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
      await shiftRecordClientProfileService.updateBulkShiftRecordClientProfile({
        shift: shiftRecord.id,
        client: props.client,
      });
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

    return updatedShiftRecord;
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

  async getShiftRecords(props: GetShiftRecordsProps) {
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
        where: {
          ...filters["Staff"],
        },
        as: "Staff",
        duplicating: true,
        required: false,
      },
      {
        model: ClientProfileModel,
        through: {
          attributes: [],
        },
        where: {
          ...filters["Client"],
        },
        as: "Client",
        duplicating: true,
        required: false,
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

export default new ShiftRecordService();
