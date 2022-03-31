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
import { shiftRecordShiftTypeService } from "./shiftRecordShiftType";
import { ShiftTypeModel } from "../shiftType";
import { createShifts } from "../../utils/shiftGenerator";
import { shiftRepeatService } from "../shiftRepeat";
import { shiftRecordStaffProfileService } from "./shiftRecordStaffProfile";
import { shiftRecordClientProfileService } from "./shiftRecordClientProfile";

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
      await shiftRecordShiftTypeService.createBulkShiftRecordShiftType({
        shift: shiftRecord.id,
        types: props.types,
      });
      await shiftRecordStaffProfileService.createBulkShiftRecordStaffProfile({
        shift: shiftRecord.id,
        staff: props.staff,
      });
      await shiftRecordClientProfileService.createBulkShiftRecordClientProfile({
        shift: shiftRecord.id,
        client: props.client,
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
    // Create types
    if (props.types && props.types.length) {
      await shiftRecordShiftTypeService.createBulkShiftRecordShiftType({
        shift: shiftRecord.id,
        types: props.types,
      });
    }

    return shiftRecord;
  }

  async updateShiftRecord(props: UpdateShiftRecordProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

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

    // Update types
    if (props.types && props.types.length) {
      await shiftRecordShiftTypeService.updateBulkShiftRecordShiftType({
        shift: shiftRecord.id,
        types: props.types,
      });
    }

    // Assign staff profiles
    if (props.staff && props.staff.length) {
      await shiftRecordStaffProfileService.updateBulkShiftRecordStaffProfile({
        shift: shiftRecord.id,
        staff: props.staff,
      });
    }

    // Assign client profiles
    if (props.client && props.client.length) {
      await shiftRecordClientProfileService.updateBulkShiftRecordClientProfile({
        shift: shiftRecord.id,
        client: props.client,
      });
    }

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
          as: "Staff",
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
        {
          model: ShiftTypeModel,
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
        required: true,
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
        required: true,
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
