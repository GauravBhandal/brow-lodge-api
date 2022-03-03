import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ClientDocumentCategoryModel from "./clientDocumentCategory.model";
import {
  CreateClientDocumentCategoryProps,
  UpdateClientDocumentCategoryProps,
  DeleteClientDocumentCategoryProps,
  GetClientDocumentCategoryByIdProps,
  GetClientDocumentCategorysProps,
} from "./clientDocumentCategory.types";
import { CustomError } from "../../components/errors";
import ClientDocumentCategoryErrorCode from "./clientDocumentCategory.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import {
  clientDocumentTypeService,
  ClientDocumentTypeModel,
} from "../clientDocumentType";
import { clientDocumentService } from "../clientDocument";

class ClientDocumentCategoryService {
  async createClientDocumentCategory(props: CreateClientDocumentCategoryProps) {
    const { types, company, name } = props;
    const createProps = _omit(props, ["types"]);

    // Check if category with same name already exists
    const existingCategory = await ClientDocumentCategoryModel.findOne({
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
        ClientDocumentCategoryErrorCode.CATEGORY_ALREADY_EXISTS
      );
    }
    //Checking if type with same name including caseinsensitive exists
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
        ClientDocumentCategoryErrorCode.CATEGORY_CONTAINS_DUPLICATE_TYPE
      );
    }

    const clientDocumentCategory = await ClientDocumentCategoryModel.create(
      createProps
    );

    if (clientDocumentCategory) {
      // Create clientDocumentType in bulk
      clientDocumentTypeService.createBulkClientDocumentType({
        types,
        category: clientDocumentCategory.id,
        company,
      });
    }

    return clientDocumentCategory;
  }

  async updateClientDocumentCategory(props: UpdateClientDocumentCategoryProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clientDocumentCategory by id and company
    const clientDocumentCategory = await ClientDocumentCategoryModel.findOne({
      where: { id, company },
    });

    // if clientDocumentCategory not found, throw an error
    if (!clientDocumentCategory) {
      throw new CustomError(
        404,
        ClientDocumentCategoryErrorCode.CATEGORY_NOT_FOUND
      );
    }

    if (
      clientDocumentCategory.name.toLowerCase() !== props.name.toLowerCase()
    ) {
      // Check if Category with same name already exists
      const existingCategory = await ClientDocumentCategoryModel.findOne({
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
          ClientDocumentCategoryErrorCode.CATEGORY_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the clientDocumentCategory
    const [, [updatedClientDocumentCategory]] =
      await ClientDocumentCategoryModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedClientDocumentCategory;
  }

  async deleteClientDocumentCategory(props: DeleteClientDocumentCategoryProps) {
    // Props
    const { id, company } = props;

    // Check if this document type is used by any document
    const clientDocument =
      await clientDocumentService.getClientDocumentByCategory({
        category: id,
        company,
      });

    // If used, then don't allow the user to delete this
    if (clientDocument && clientDocument.length > 0) {
      throw new CustomError(
        409,
        ClientDocumentCategoryErrorCode.DOCUMENT_CATEGORY_IN_USE
      );
    }

    // Find and delete the clientDocumentCategory by id and company
    const clientDocumentCategory = await ClientDocumentCategoryModel.destroy({
      where: { id, company },
    });

    // if clientDocumentCategory has been deleted, throw an error
    if (!clientDocumentCategory) {
      throw new CustomError(
        404,
        ClientDocumentCategoryErrorCode.CATEGORY_NOT_FOUND
      );
    }

    return clientDocumentCategory;
  }

  async getClientDocumentCategoryById(
    props: GetClientDocumentCategoryByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the clientDocumentCategory by id and company
    const clientDocumentCategory = await ClientDocumentCategoryModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: ClientDocumentTypeModel,
          as: "Types",
        },
      ],
    });

    // If no clientDocumentCategory has been found, then throw an error
    if (!clientDocumentCategory) {
      throw new CustomError(
        404,
        ClientDocumentCategoryErrorCode.CATEGORY_NOT_FOUND
      );
    }

    return clientDocumentCategory;
  }

  async getClientDocumentCategorys(props: GetClientDocumentCategorysProps) {
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
        model: ClientDocumentTypeModel,
        as: "Types",
      },
    ];

    // Count total clientDocumentCategorys in the given company
    const count = await ClientDocumentCategoryModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all clientDocumentCategorys for matching props and company
    const data = await ClientDocumentCategoryModel.findAll({
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

export default new ClientDocumentCategoryService();
