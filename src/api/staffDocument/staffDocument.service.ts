import { omit as _omit } from "lodash";

import StaffDocumentModel from "./staffDocument.model";
import {
  CreateStaffDocumentProps,
  UpdateStaffDocumentProps,
  DeleteStaffDocumentProps,
  GetStaffDocumentByIdProps,
  GetStaffDocumentsProps,
} from "./staffDocument.types";
import { CustomError } from "../../components/errors";
import StaffDocumentErrorCode from "./staffDocument.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { staffDocumentAttachmentService } from "./staffDocumentAttachment";
import { AttachmentModel } from "../attachment";
import { StaffDocumentTypeModel } from "../staffDocumentType";
import { StaffDocumentCategoryModel } from "../staffDocumentCategory";
import { StaffProfileModel } from "../staffProfile";
class StaffDocumentService {
  async createStaffDocument(props: CreateStaffDocumentProps) {
    const staffDocument = await StaffDocumentModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await staffDocumentAttachmentService.createBulkStaffDocumentAttachment({
        relation: staffDocument.id,
        attachments: props.attachments,
      });
    }

    return staffDocument;
  }

  async updateStaffDocument(props: UpdateStaffDocumentProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find staffDocument by id and company
    const staffDocument = await StaffDocumentModel.findOne({
      where: { id, company },
    });

    // if staffDocument not found, throw an error
    if (!staffDocument) {
      throw new CustomError(
        404,
        StaffDocumentErrorCode.STAFF_DOCUMENT_NOT_FOUND
      );
    }

    // Finally, update the staffDocument
    const [, [updatedStaffDocument]] = await StaffDocumentModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments && props.attachments.length) {
      await staffDocumentAttachmentService.updateBulkStaffDocumentAttachment({
        relation: staffDocument.id,
        attachments: props.attachments,
      });
    }
    return updatedStaffDocument;
  }

  async deleteStaffDocument(props: DeleteStaffDocumentProps) {
    // Props
    const { id, company } = props;

    // Find and delete the staffDocument by id and company
    const staffDocument = await StaffDocumentModel.destroy({
      where: { id, company },
    });

    // if staffDocument has been deleted, throw an error
    if (!staffDocument) {
      throw new CustomError(
        404,
        StaffDocumentErrorCode.STAFF_DOCUMENT_NOT_FOUND
      );
    }

    return staffDocument;
  }

  async getStaffDocumentById(props: GetStaffDocumentByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the staffDocument by id and company
    const staffDocument = await StaffDocumentModel.findOne({
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
          model: StaffDocumentTypeModel,
          as: "Type",
        },
        {
          model: StaffDocumentCategoryModel,
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

    // If no staffDocument has been found, then throw an error
    if (!staffDocument) {
      throw new CustomError(
        404,
        StaffDocumentErrorCode.STAFF_DOCUMENT_NOT_FOUND
      );
    }

    return staffDocument;
  }

  async getStaffDocuments(props: GetStaffDocumentsProps) {
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
      },
      {
        model: StaffDocumentTypeModel,
        as: "Type",
      },
      {
        model: StaffDocumentCategoryModel,
        as: "Category",
      },
      {
        model: AttachmentModel,
        through: {
          attributes: [],
        },
      },
    ];

    // Count total staffDocuments in the given company
    const count = await StaffDocumentModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all staffDocuments for matching props and company
    const data = await StaffDocumentModel.findAll({
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

export default new StaffDocumentService();
