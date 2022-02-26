import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import StaffDocumentTypeModel from "./staffDocumentType.model";
import {
  CreateBulkStaffDocumentTypeProps,
  CreateStaffDocumentTypeProps,
  UpdateStaffDocumentTypeProps,
  DeleteStaffDocumentTypeProps,
  GetStaffDocumentTypeByIdProps,
  GetStaffDocumentTypesProps,
} from "./staffDocumentType.types";
import { CustomError } from "../../components/errors";
import StaffDocumentTypeErrorCode from "./staffDocumentType.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffDocumentCategoryModel } from "../staffDocumentCategory";
import { getFilters } from "../../components/filters";

class StaffDocumentTypeService {
  async createBulkStaffDocumentType(props: CreateBulkStaffDocumentTypeProps) {
    const { company, category, types } = props;
    const createProps = types.map((type) => ({
      name: type,
      company,
      category,
    }));

    const staffDocumentTypes = await StaffDocumentTypeModel.bulkCreate(
      createProps
    );

    return staffDocumentTypes;
  }

  async createStaffDocumentType(props: CreateStaffDocumentTypeProps) {
    const { category, name, company } = props;

    // Check if type with same name already exists
    const existingType = await StaffDocumentTypeModel.findOne({
      where: {
        company,
        category,
        name: {
          [Op.iLike]: `${name}`,
        },
      },
    });

    // If exists, then throw an error
    if (existingType) {
      throw new CustomError(
        409,
        StaffDocumentTypeErrorCode.STAFF_DOCUMENT_TYPE_ALREADY_EXISTS
      );
    }
    const staffDocumentType = await StaffDocumentTypeModel.create(props);
    return staffDocumentType;
  }

  async updateStaffDocumentType(props: UpdateStaffDocumentTypeProps) {
    // Props
    const { id, company, category } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find staffDocumentType by id and company
    const staffDocumentType = await StaffDocumentTypeModel.findOne({
      where: { id, company },
    });

    // if staffDocumentType not found, throw an error
    if (!staffDocumentType) {
      throw new CustomError(
        404,
        StaffDocumentTypeErrorCode.STAFF_DOCUMENT_TYPE_NOT_FOUND
      );
    }

    if (staffDocumentType.name.toLowerCase() !== props.name.toLowerCase()) {
      // Check if type with same name already exists
      const existingType = await StaffDocumentTypeModel.findOne({
        where: {
          name: {
            [Op.iLike]: `${props.name}`,
          },
          company,
          category,
        },
      });

      // If exists, then throw an error
      if (existingType) {
        throw new CustomError(
          409,
          StaffDocumentTypeErrorCode.STAFF_DOCUMENT_TYPE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the staffDocumentType
    const [, [updatedStaffDocumentType]] = await StaffDocumentTypeModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedStaffDocumentType;
  }

  async deleteStaffDocumentType(props: DeleteStaffDocumentTypeProps) {
    // Props
    const { id, company } = props;

    // Find and delete the staffDocumentType by id and company
    const staffDocumentType = await StaffDocumentTypeModel.destroy({
      where: { id, company },
    });

    // if staffDocumentType has been deleted, throw an error
    if (!staffDocumentType) {
      throw new CustomError(
        404,
        StaffDocumentTypeErrorCode.STAFF_DOCUMENT_TYPE_NOT_FOUND
      );
    }

    return staffDocumentType;
  }

  async getStaffDocumentTypeById(props: GetStaffDocumentTypeByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the staffDocumentType by id and company
    const staffDocumentType = await StaffDocumentTypeModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffDocumentCategoryModel,
          as: "Category",
        },
      ],
    });

    // If no staffDocumentType has been found, then throw an error
    if (!staffDocumentType) {
      throw new CustomError(
        404,
        StaffDocumentTypeErrorCode.STAFF_DOCUMENT_TYPE_NOT_FOUND
      );
    }

    return staffDocumentType;
  }

  async getStaffDocumentTypes(props: GetStaffDocumentTypesProps) {
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
        model: StaffDocumentCategoryModel,
        as: "Category",
      },
    ];

    // Count total staffDocumentTypes in the given company
    const count = await StaffDocumentTypeModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all staffDocumentTypes for matching props and company
    const data = await StaffDocumentTypeModel.findAll({
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

export default new StaffDocumentTypeService();
