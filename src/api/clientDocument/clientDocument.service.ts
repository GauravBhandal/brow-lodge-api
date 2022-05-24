import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ClientDocumentModel from "./clientDocument.model";
import {
  CreateClientDocumentProps,
  UpdateClientDocumentProps,
  DeleteClientDocumentProps,
  GetClientDocumentByTypeProps,
  GetClientDocumentByCategoryProps,
  GetClientDocumentByIdProps,
  GetClientDocumentsProps,
} from "./clientDocument.types";
import { CustomError } from "../../components/errors";
import ClientDocumentErrorCode from "./clientDocument.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { clientDocumentAttachmentService } from "./clientDocumentAttachment";
import { AttachmentModel } from "../attachment";
import { ClientDocumentTypeModel } from "../clientDocumentType";
import { ClientDocumentCategoryModel } from "../clientDocumentCategory";
import { ClientProfileModel } from "../clientProfile";
class ClientDocumentService {
  async createClientDocument(props: CreateClientDocumentProps) {
    const { category, type, client, company } = props;

    // Check if document already exists
    const existingDocument = await ClientDocumentModel.findOne({
      where: { category, type, client, company },
    });

    // If already exists, throw an error
    if (existingDocument) {
      throw new CustomError(
        409,
        ClientDocumentErrorCode.CLIENT_DOCUMENT_ALREADY_EXISTS
      );
    }

    const clientDocument = await ClientDocumentModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await clientDocumentAttachmentService.createBulkClientDocumentAttachment({
        relation: clientDocument.id,
        attachments: props.attachments,
      });
    }

    return clientDocument;
  }

  async updateClientDocument(props: UpdateClientDocumentProps) {
    // Props
    const { category, type, client, company, id } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find clientDocument by id and company
    const clientDocument = await ClientDocumentModel.findOne({
      where: { id, company },
    });

    // if clientDocument not found, throw an error
    if (!clientDocument) {
      throw new CustomError(
        404,
        ClientDocumentErrorCode.CLIENT_DOCUMENT_NOT_FOUND
      );
    }

    if (
      clientDocument.category != category ||
      clientDocument.type != type ||
      clientDocument.client != client ||
      clientDocument.company != company
    ) {
      // Check if document already exists
      const existingDocument = await ClientDocumentModel.findOne({
        where: { category, type, client, company },
      });

      // If already exists, throw an error
      if (existingDocument) {
        throw new CustomError(
          409,
          ClientDocumentErrorCode.CLIENT_DOCUMENT_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the clientDocument
    const [, [updatedClientDocument]] = await ClientDocumentModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await clientDocumentAttachmentService.updateBulkClientDocumentAttachment({
        relation: clientDocument.id,
        attachments: props.attachments,
      });
    }
    return updatedClientDocument;
  }

  async deleteClientDocument(props: DeleteClientDocumentProps) {
    // Props
    const { id, company } = props;

    // Find and delete the clientDocument by id and company
    const clientDocument = await ClientDocumentModel.destroy({
      where: { id, company },
    });

    // if clientDocument has been deleted, throw an error
    if (!clientDocument) {
      throw new CustomError(
        404,
        ClientDocumentErrorCode.CLIENT_DOCUMENT_NOT_FOUND
      );
    }

    return clientDocument;
  }

  async getClientDocumentById(props: GetClientDocumentByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the clientDocument by id and company
    const clientDocument = await ClientDocumentModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: ClientProfileModel,
          as: "Client",
        },
        {
          model: ClientDocumentTypeModel,
          as: "Type",
        },
        {
          model: ClientDocumentCategoryModel,
          as: "Category",
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no clientDocument has been found, then throw an error
    if (!clientDocument) {
      throw new CustomError(
        404,
        ClientDocumentErrorCode.CLIENT_DOCUMENT_NOT_FOUND
      );
    }

    return clientDocument;
  }

  async getClientDocumentByType(props: GetClientDocumentByTypeProps) {
    // Props
    const { type, company } = props;

    // Find the clientDocument by type and company
    const clientDocument = await ClientDocumentModel.findAll({
      where: { type, company },
    });

    return clientDocument;
  }

  async getClientDocumentByCategory(props: GetClientDocumentByCategoryProps) {
    // Props
    const { category, company } = props;

    // Find the clientDocument by category and company
    const clientDocument = await ClientDocumentModel.findAll({
      where: { category, company },
    });

    return clientDocument;
  }

  async getClientDocuments(props: GetClientDocumentsProps, userId: string) {
    // Props
    const { page, pageSize, sort, where, company, showConfidential } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    let filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

    // Only return archived results if filters contains archived
    if (filters.Client) {
      if (!filters.Client.archived) {
        filters.Client.archived = { [Op.eq]: "false" };
      }
    } else {
      filters = {
        ...filters,
        Client: {
          archived: {
            [Op.eq]: "false",
          },
        },
      };
    }

    const checkIsConfidential = () => {
      return !showConfidential ? { isConfidential: { [Op.ne]: "true" } } : {};
    };

    const include = [
      {
        model: CompanyModel,
      },
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
          ...clientFilters,
        },
      },
      {
        model: ClientDocumentTypeModel,
        as: "Type",
        where: {
          ...filters["Type"],
        },
      },
      {
        model: ClientDocumentCategoryModel,
        as: "Category",
        where: {
          ...filters["Category"],
          ...checkIsConfidential(),
        },
      },
    ];

    // Count total clientDocuments in the given company
    const count = await ClientDocumentModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all clientDocuments for matching props and company
    const data = await ClientDocumentModel.findAll({
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

export default new ClientDocumentService();
