import { omit as _omit } from "lodash";

import ClientDocumentModel from "./clientDocument.model";
import {
  CreateClientDocumentProps,
  UpdateClientDocumentProps,
  DeleteClientDocumentProps,
  GetClientDocumentByIdProps,
  GetClientDocumentsProps,
} from "./clientDocument.types";
import { CustomError } from "../../components/errors";
import ClientDocumentErrorCode from "./clientDocument.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { clientDocumentAttachmentService } from "./clientDocumentAttachment";
import { AttachmentModel } from "../attachment";
import { ClientDocumentTypeModel } from "../clientDocumentType";
import { ClientDocumentCategoryModel } from "../clientDocumentCategory";
import { ClientProfileModel } from "../clientProfile";
class ClientDocumentService {
  async createClientDocument(props: CreateClientDocumentProps) {
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
    const { id, company } = props;
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

  async getClientDocuments(props: GetClientDocumentsProps) {
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
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
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
        },
      },
      {
        model: AttachmentModel,
        through: {
          attributes: [],
        },
      },
    ];

    // Count total clientDocuments in the given company
    const count = await ClientDocumentModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
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

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new ClientDocumentService();
