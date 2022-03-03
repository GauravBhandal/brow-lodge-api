import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ClientDocumentTypeModel from "./clientDocumentType.model";
import {
  CreateBulkClientDocumentTypeProps,
  CreateClientDocumentTypeProps,
  UpdateClientDocumentTypeProps,
  DeleteClientDocumentTypeProps,
  GetClientDocumentTypeByIdProps,
  GetClientDocumentTypesProps,
} from "./clientDocumentType.types";
import { CustomError } from "../../components/errors";
import ClientDocumentTypeErrorCode from "./clientDocumentType.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientDocumentCategoryModel } from "../clientDocumentCategory";
import { getFilters } from "../../components/filters";

class ClientDocumentTypeService {
  async createBulkClientDocumentType(props: CreateBulkClientDocumentTypeProps) {
    const { company, category, types } = props;
    const createProps = types.map((type) => ({
      name: type,
      company,
      category,
    }));

    const clientDocumentTypes = await ClientDocumentTypeModel.bulkCreate(
      createProps
    );

    return clientDocumentTypes;
  }

  async createClientDocumentType(props: CreateClientDocumentTypeProps) {
    const { category, name, company } = props;

    // Check if type with same name already exists
    const existingType = await ClientDocumentTypeModel.findOne({
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
        ClientDocumentTypeErrorCode.CLIENT_DOCUMENT_TYPE_ALREADY_EXISTS
      );
    }

    const clientDocumentType = await ClientDocumentTypeModel.create(props);
    return clientDocumentType;
  }

  async updateClientDocumentType(props: UpdateClientDocumentTypeProps) {
    // Props
    const { id, company, category } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clientDocumentType by id and company
    const clientDocumentType = await ClientDocumentTypeModel.findOne({
      where: { id, company },
    });

    // if clientDocumentType not found, throw an error
    if (!clientDocumentType) {
      throw new CustomError(
        404,
        ClientDocumentTypeErrorCode.CLIENT_DOCUMENT_TYPE_NOT_FOUND
      );
    }

    if (clientDocumentType.name.toLowerCase() !== props.name.toLowerCase()) {
      // Check if type with same name already exists
      const existingType = await ClientDocumentTypeModel.findOne({
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
          ClientDocumentTypeErrorCode.CLIENT_DOCUMENT_TYPE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the clientDocumentType
    const [, [updatedClientDocumentType]] =
      await ClientDocumentTypeModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });
    return updatedClientDocumentType;
  }

  async deleteClientDocumentType(props: DeleteClientDocumentTypeProps) {
    // Props
    const { id, company } = props;

    // Find and delete the clientDocumentType by id and company
    const clientDocumentType = await ClientDocumentTypeModel.destroy({
      where: { id, company },
    });

    // if clientDocumentType has been deleted, throw an error
    if (!clientDocumentType) {
      throw new CustomError(
        404,
        ClientDocumentTypeErrorCode.CLIENT_DOCUMENT_TYPE_NOT_FOUND
      );
    }

    return clientDocumentType;
  }

  async getClientDocumentTypeById(props: GetClientDocumentTypeByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the clientDocumentType by id and company
    const clientDocumentType = await ClientDocumentTypeModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: ClientDocumentCategoryModel,
          as: "Category",
        },
      ],
    });

    // If no clientDocumentType has been found, then throw an error
    if (!clientDocumentType) {
      throw new CustomError(
        404,
        ClientDocumentTypeErrorCode.CLIENT_DOCUMENT_TYPE_NOT_FOUND
      );
    }

    return clientDocumentType;
  }

  async getClientDocumentTypes(props: GetClientDocumentTypesProps) {
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
        model: ClientDocumentCategoryModel,
        as: "Category",
      },
    ];

    // Count total clientDocumentTypes in the given company
    const count = await ClientDocumentTypeModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all clientDocumentTypes for matching props and company
    const data = await ClientDocumentTypeModel.findAll({
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

export default new ClientDocumentTypeService();
