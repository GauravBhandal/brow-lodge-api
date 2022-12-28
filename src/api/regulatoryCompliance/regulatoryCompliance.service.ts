import { omit as _omit } from "lodash";

import RegulatoryComplianceModel from "./regulatoryCompliance.model";
import {
  CreateRegulatoryComplianceProps,
  UpdateRegulatoryComplianceProps,
  DeleteRegulatoryComplianceProps,
  GetRegulatoryComplianceByIdProps,
  GetRegulatoryCompliancesProps,
} from "./regulatoryCompliance.types";
import { CustomError } from "../../components/errors";
import RegulatoryComplianceErrorCode from "./regulatoryCompliance.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { regulatoryComplianceAttachmentService } from "./regulatoryComplianceAttachment";
import { AttachmentModel } from "../attachment";

class RegulatoryComplianceService {
  async createRegulatoryCompliance(props: CreateRegulatoryComplianceProps) {
    const regulatoryCompliance = await RegulatoryComplianceModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await regulatoryComplianceAttachmentService.createBulkRegulatoryComplianceAttachment(
        {
          relation: regulatoryCompliance.id,
          attachments: props.attachments,
        }
      );
    }
    return regulatoryCompliance;
  }

  async updateRegulatoryCompliance(props: UpdateRegulatoryComplianceProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find regulatoryCompliance by id and company
    const regulatoryCompliance = await RegulatoryComplianceModel.findOne({
      where: { id, company },
    });

    // if regulatoryCompliance not found, throw an error
    if (!regulatoryCompliance) {
      throw new CustomError(
        404,
        RegulatoryComplianceErrorCode.REGULATORY_COMPLIANCE_NOT_FOUND
      );
    }

    // Finally, update the regulatoryCompliance
    const [, [updatedRegulatoryCompliance]] =
      await RegulatoryComplianceModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments
    if (props.attachments) {
      await regulatoryComplianceAttachmentService.updateBulkRegulatoryComplianceAttachment(
        {
          relation: regulatoryCompliance.id,
          attachments: props.attachments,
        }
      );
    }

    return updatedRegulatoryCompliance;
  }

  async deleteArchiveRegulatoryCompliance(
    props: DeleteRegulatoryComplianceProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the regulatoryCompliance by id and company
    const regulatoryCompliance = await RegulatoryComplianceModel.findOne({
      where: { id, company },
    });

    // if regulatoryCompliance has been deleted, throw an error
    if (!regulatoryCompliance) {
      throw new CustomError(
        404,
        RegulatoryComplianceErrorCode.REGULATORY_COMPLIANCE_NOT_FOUND
      );
    }

    if (regulatoryCompliance.archived) {
      // Check if document already exists
      const existingRegulatoryCompliance =
        await RegulatoryComplianceModel.findAll({
          where: {
            date: regulatoryCompliance.date,
            staff: regulatoryCompliance.staff,
            title: regulatoryCompliance.title,
            category: regulatoryCompliance.category,
            company: regulatoryCompliance.company,
            archived: false,
          },
        });

      if (existingRegulatoryCompliance.length > 0) {
        throw new CustomError(
          409,
          RegulatoryComplianceErrorCode.REGULATORY_COMPLIANCE_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the regulatoryCompliance update the Archive state
    const [, [updatedRegulatoryCompliance]] =
      await RegulatoryComplianceModel.update(
        { archived: !regulatoryCompliance.archived },
        {
          where: { id, company },
          returning: true,
        }
      );

    return updatedRegulatoryCompliance;
  }

  async deleteRegulatoryCompliance(props: DeleteRegulatoryComplianceProps) {
    // Props
    const { id, company } = props;

    // Find and delete the regulatoryCompliance by id and company
    const regulatoryCompliance = await RegulatoryComplianceModel.destroy({
      where: { id, company },
    });

    // if regulatoryCompliance has been deleted, throw an error
    if (!regulatoryCompliance) {
      throw new CustomError(
        404,
        RegulatoryComplianceErrorCode.REGULATORY_COMPLIANCE_NOT_FOUND
      );
    }

    return regulatoryCompliance;
  }

  async getRegulatoryComplianceById(props: GetRegulatoryComplianceByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the regulatoryCompliance by id and company
    const regulatoryCompliance = await RegulatoryComplianceModel.findOne({
      where: { id, company },
      include: [
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no regulatoryCompliance has been found, then throw an error
    if (!regulatoryCompliance) {
      throw new CustomError(
        404,
        RegulatoryComplianceErrorCode.REGULATORY_COMPLIANCE_NOT_FOUND
      );
    }

    return regulatoryCompliance;
  }

  async getRegulatoryCompliances(
    props: GetRegulatoryCompliancesProps,
    userId: string
  ) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    const clientFilters = await addCientFiltersByTeams(userId, company);

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
    ];

    // Count total regulatoryCompliances in the given company
    const count = await RegulatoryComplianceModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all regulatoryCompliances for matching props and company
    const data = await RegulatoryComplianceModel.findAll({
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

export default new RegulatoryComplianceService();
