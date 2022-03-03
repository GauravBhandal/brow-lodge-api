import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import StaffDocumentCategoryModel from "./staffDocumentCategory.model";
import {
  CreateStaffDocumentCategoryProps,
  UpdateStaffDocumentCategoryProps,
  DeleteStaffDocumentCategoryProps,
  GetStaffDocumentCategoryByIdProps,
  GetStaffDocumentCategorysProps,
} from "./staffDocumentCategory.types";
import { CustomError } from "../../components/errors";
import StaffDocumentCategoryErrorCode from "./staffDocumentCategory.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import {
  staffDocumentTypeService,
  StaffDocumentTypeModel,
} from "../staffDocumentType";
class StaffDocumentCategoryService {
  async createStaffDocumentCategory(props: CreateStaffDocumentCategoryProps) {
    const { types, company, name } = props;
    const createProps = _omit(props, ["types"]);

    // Check if category with same name already exists
    const existingCategory = await StaffDocumentCategoryModel.findOne({
      where: {
        company,
        name: {
          [Op.iLike]: `${name}`,
        },
      },
    });

    // If exists, then throw an error
    if (existingCategory) {
      throw new CustomError(
        409,
        StaffDocumentCategoryErrorCode.CATEGORY_ALREADY_EXISTS
      );
    }

    //Checking if type with same name including case insensitive exists
    const newTypes = types.reduce(
      (unique: string[], item: string) =>
        unique.includes(item.toLowerCase())
          ? unique
          : [...unique, item.toLowerCase()],
      []
    );

    if (newTypes.length !== types.length) {
      throw new CustomError(
        409,
        StaffDocumentCategoryErrorCode.CATEGORY_CONTAINS_DUPLICATE_TYPE
      );
    }

    const staffDocumentCategory = await StaffDocumentCategoryModel.create(
      createProps
    );

    if (staffDocumentCategory) {
      // Create clientDocumentType in bulk
      staffDocumentTypeService.createBulkStaffDocumentType({
        types,
        category: staffDocumentCategory.id,
        company,
      });
    }

    return staffDocumentCategory;
  }

  async updateStaffDocumentCategory(props: UpdateStaffDocumentCategoryProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find staffDocumentCategory by id and company
    const staffDocumentCategory = await StaffDocumentCategoryModel.findOne({
      where: { id, company },
    });

    // if staffDocumentCategory not found, throw an error
    if (!staffDocumentCategory) {
      throw new CustomError(
        404,
        StaffDocumentCategoryErrorCode.STAFF_DOCUMENT_CATEGORY_NOT_FOUND
      );
    }

    if (staffDocumentCategory.name.toLowerCase() !== props.name.toLowerCase()) {
      // Check if Category with same name already exists
      const existingCategory = await StaffDocumentCategoryModel.findOne({
        where: {
          name: {
            [Op.iLike]: `${props.name}`,
          },
          company,
        },
      });

      // If exists, then throw an error
      if (existingCategory) {
        throw new CustomError(
          409,
          StaffDocumentCategoryErrorCode.CATEGORY_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the staffDocumentCategory
    const [, [updatedStaffDocumentCategory]] =
      await StaffDocumentCategoryModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedStaffDocumentCategory;
  }

  async deleteStaffDocumentCategory(props: DeleteStaffDocumentCategoryProps) {
    // Props
    const { id, company } = props;

    // Find and delete the staffDocumentCategory by id and company
    const staffDocumentCategory = await StaffDocumentCategoryModel.destroy({
      where: { id, company },
    });

    // if staffDocumentCategory has been deleted, throw an error
    if (!staffDocumentCategory) {
      throw new CustomError(
        404,
        StaffDocumentCategoryErrorCode.STAFF_DOCUMENT_CATEGORY_NOT_FOUND
      );
    }

    return staffDocumentCategory;
  }

  async getStaffDocumentCategoryById(props: GetStaffDocumentCategoryByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the staffDocumentCategory by id and company
    const staffDocumentCategory = await StaffDocumentCategoryModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffDocumentTypeModel,
          as: "Types",
        },
      ],
    });

    // If no staffDocumentCategory has been found, then throw an error
    if (!staffDocumentCategory) {
      throw new CustomError(
        404,
        StaffDocumentCategoryErrorCode.STAFF_DOCUMENT_CATEGORY_NOT_FOUND
      );
    }

    return staffDocumentCategory;
  }

  async getStaffDocumentCategorys(props: GetStaffDocumentCategorysProps) {
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
        model: StaffDocumentTypeModel,
        as: "Types",
      },
    ];

    // Count total staffDocumentCategorys in the given company
    const count = await StaffDocumentCategoryModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all staffDocumentCategorys for matching props and company
    const data = await StaffDocumentCategoryModel.findAll({
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

export default new StaffDocumentCategoryService();
