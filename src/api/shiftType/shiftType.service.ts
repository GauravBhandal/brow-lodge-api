import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ShiftTypeModel from "./shiftType.model";
import {
  CreateShiftTypeProps,
  UpdateShiftTypeProps,
  DeleteShiftTypeProps,
  GetShiftTypeByIdProps,
  GetShiftTypesProps,
} from "./shiftType.types";
import { CustomError } from "../../components/errors";
import ShiftTypeErrorCode from "./shiftType.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";

class ShiftTypeService {
  async createShiftType(props: CreateShiftTypeProps) {
    // Props
    const { company, name } = props;

    // Check if shiftType with same name already exists
    const existingShiftType = await ShiftTypeModel.findOne({
      where: {
        company,
        name: {
          [Op.iLike]: `${name}`,
        },
      },
    });

    // If exists, then throw an error
    if (existingShiftType) {
      throw new CustomError(409, ShiftTypeErrorCode.SHIFT_TYPE_ALREADY_EXISTS);
    }

    // Otherwise, create a new shiftType
    const shiftType = await ShiftTypeModel.create(props);

    return shiftType;
  }

  async updateShiftType(props: UpdateShiftTypeProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find shiftType by id and company
    const shiftType = await ShiftTypeModel.findOne({
      where: { id, company },
    });

    // if shiftType not found, throw an error
    if (!shiftType) {
      throw new CustomError(404, ShiftTypeErrorCode.SHIFT_TYPE_NOT_FOUND);
    }

    if (shiftType.name.toLowerCase() !== props.name.toLowerCase()) {
      // Check if shiftType with same name already exists
      const existingShiftType = await ShiftTypeModel.findOne({
        where: {
          name: {
            [Op.iLike]: `${props.name}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingShiftType) {
        throw new CustomError(
          409,
          ShiftTypeErrorCode.SHIFT_TYPE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the shiftType
    const [, [updatedShiftType]] = await ShiftTypeModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    return updatedShiftType;
  }

  async deleteShiftType(props: DeleteShiftTypeProps) {
    // Props
    const { id, company } = props;

    // Find and delete the shiftType by id and company
    const shiftType = await ShiftTypeModel.destroy({
      where: { id, company },
    });

    // if shiftType has been deleted, throw an error
    if (!shiftType) {
      throw new CustomError(404, ShiftTypeErrorCode.SHIFT_TYPE_NOT_FOUND);
    }

    return shiftType;
  }

  async getShiftTypeById(props: GetShiftTypeByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the shiftType by id and company
    const shiftType = await ShiftTypeModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
      ],
    });

    // If no shiftType has been found, then throw an error
    if (!shiftType) {
      throw new CustomError(404, ShiftTypeErrorCode.SHIFT_TYPE_NOT_FOUND);
    }

    return shiftType;
  }

  async getShiftTypes(props: GetShiftTypesProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const include = [
      {
        model: CompanyModel,
      },
    ];

    // Count total shiftTypes in the given company
    const count = await ShiftTypeModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all shiftTypes for matching props and company
    const data = await ShiftTypeModel.findAll({
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

export default new ShiftTypeService();
