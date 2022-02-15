import { omit as _omit } from "lodash";

import ShiftRecordModel from "./shiftRecord.model";
import {
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

class ShiftRecordService {
  async createShiftRecord(props: CreateShiftRecordProps) {
    // Create a new shiftRecord
    const shiftRecord = await ShiftRecordModel.create(props);

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

    return updatedShiftRecord;
  }

  async deleteShiftRecord(props: DeleteShiftRecordProps) {
    // Props
    const { id, company } = props;

    // Find and delete the shiftRecord by id and company
    const shiftRecord = await ShiftRecordModel.destroy({
      where: { id, company },
    });

    // if shiftRecord has been deleted, throw an error
    if (!shiftRecord) {
      throw new CustomError(404, ShiftRecordErrorCode.SHIFT_RECORD_NOT_FOUND);
    }

    return shiftRecord;
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
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
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
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new ShiftRecordService();
