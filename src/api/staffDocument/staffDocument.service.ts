import { omit as _omit } from "lodash";
import { Op } from "sequelize";

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
    const { category, type, staff, company } = props;

    // Check if document already exists
    const existingDocument = await StaffDocumentModel.findOne({
      where: { category, type, staff, company },
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
    const { category, type, staff, company, id } = props;
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
      staffDocument.company != company
    ) {
      // Check if document already exists
      const existingDocument = await StaffDocumentModel.findOne({
        where: { category, type, staff, company },
      });

      // If already exists, throw an error
      if (existingDocument) {
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
    let filters = getFilters(where);

    // Only return archived results if filters contains archived
    if (filters.Staff && !filters.Staff.archived) {
      filters.Staff.archived = {
        [Op.eq]: "false",
      };
    } else if (!filters.Staff) {
      filters = {
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
      subQuery: false, // TODO: I have no idea why we need this, but removing it will break sort by staff
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new StaffDocumentService();
