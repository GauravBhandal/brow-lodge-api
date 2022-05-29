import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import StaffDocumentModel from "./staffDocument.model";
import {
  CreateStaffDocumentProps,
  UpdateStaffDocumentProps,
  DeleteStaffDocumentProps,
  GetStaffDocumentByIdProps,
  GetStaffDocumentByTypeProps,
  GetStaffDocumentByCategoryProps,
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
    const { category, type, staff, company } = props;

    // Check if document already exists
    const existingDocument = await StaffDocumentModel.findOne({
      where: { category, type, staff, company, archived: false },
    });

    // If already exists, throw an error
    if (existingDocument) {
      throw new CustomError(
        409,
        StaffDocumentErrorCode.STAFF_DOCUMENT_ALREADY_EXISTS
      );
    }

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
    const { category, type, staff, company, id, archived } = props;
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

    if (
      staffDocument.category != category ||
      staffDocument.type != type ||
      staffDocument.staff != staff ||
      staffDocument.company != company ||
      !archived
    ) {
      // Check if document already exists
      const existingDocument = await StaffDocumentModel.findOne({
        where: { category, type, staff, company, archived: false },
      });

      // If already exists, throw an error
      if (existingDocument && existingDocument.id !== id) {
        throw new CustomError(
          409,
          StaffDocumentErrorCode.STAFF_DOCUMENT_ALREADY_EXISTS
        );
      }
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
    if (props.attachments) {
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

    // Finally, update the staffDocument update the Archive state
    const [, [updatedStaffDocument]] = await StaffDocumentModel.update(
      { archived: !staffDocument.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedStaffDocument;
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

  async getStaffDocumentByType(props: GetStaffDocumentByTypeProps) {
    // Props
    const { type, company } = props;

    // Find the staffDocument by type and company
    const staffDocument = await StaffDocumentModel.findAll({
      where: { type, company },
    });

    return staffDocument;
  }

  async getStaffDocumentByCategory(props: GetStaffDocumentByCategoryProps) {
    // Props
    const { category, company } = props;

    // Find the staffDocument by category and company
    const staffDocument = await StaffDocumentModel.findAll({
      where: { category, company },
    });

    return staffDocument;
  }

  async getStaffDocuments(props: GetStaffDocumentsProps) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    let filters = getFilters(where);

    // Only return archived results if filters contains archived

    if (filters.Staff) {
      if (!filters.Staff.archived) {
        filters.Staff.archived = { [Op.eq]: "false" };
      }
    } else {
      filters = {
        ...filters,
        Staff: {
          archived: {
            [Op.eq]: "false",
          },
        },
      };
    }
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
        model: StaffDocumentTypeModel,
        as: "Type",
        where: {
          ...filters["Type"],
        },
      },
      {
        model: StaffDocumentCategoryModel,
        as: "Category",
        where: {
          ...filters["Category"],
        },
      },
    ];

    // Count total staffDocuments in the given company
    const count = await StaffDocumentModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
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

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new StaffDocumentService();
