import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import PolicyReviewModel from "./policyReview.model";
import {
  CreatePolicyReviewProps,
  UpdatePolicyReviewProps,
  DeletePolicyReviewProps,
  GetPolicyReviewByIdProps,
  GetPolicyReviewByPolicyProps,
  GetPolicyReviewsProps,
} from "./policyReview.types";
import { CustomError } from "../../components/errors";
import PolicyReviewErrorCode from "./policyReview.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { getFilters } from "../../components/filters";
import { policyReviewAttachmentService } from "./policyReviewAttachment";
import { AttachmentModel } from "../attachment";
import { PolicyModel } from "../policy";
import { StaffProfileModel } from "../staffProfile";
class PolicyReviewService {
  async createPolicyReview(props: CreatePolicyReviewProps) {
    const policyReview = await PolicyReviewModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await policyReviewAttachmentService.createBulkPolicyReviewAttachment({
        relation: policyReview.id,
        attachments: props.attachments,
      });
    }

    return policyReview;
  }

  async updatePolicyReview(props: UpdatePolicyReviewProps) {
    // Props
    const { policy, staff, company, id } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find policyReview by id and company
    const policyReview = await PolicyReviewModel.findOne({
      where: { id, company },
    });

    // if policyReview not found, throw an error
    if (!policyReview) {
      throw new CustomError(404, PolicyReviewErrorCode.POLICY_REVIEW_NOT_FOUND);
    }

    // Finally, update the policyReview
    const [, [updatedPolicyReview]] = await PolicyReviewModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );

    // Update attachments
    if (props.attachments) {
      await policyReviewAttachmentService.updateBulkPolicyReviewAttachment({
        relation: policyReview.id,
        attachments: props.attachments,
      });
    }
    return updatedPolicyReview;
  }

  async deletePolicyReview(props: DeletePolicyReviewProps) {
    // Props
    const { id, company } = props;

    // Find and delete the policyReview by id and company
    const policyReview = await PolicyReviewModel.destroy({
      where: { id, company },
    });

    // if policyReview has been deleted, throw an error
    if (!policyReview) {
      throw new CustomError(404, PolicyReviewErrorCode.POLICY_REVIEW_NOT_FOUND);
    }

    return policyReview;
  }

  async getPolicyReviewById(props: GetPolicyReviewByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the policyReview by id and company
    const policyReview = await PolicyReviewModel.findOne({
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
          model: PolicyModel,
          as: "Policy",
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no policyReview has been found, then throw an error
    if (!policyReview) {
      throw new CustomError(404, PolicyReviewErrorCode.POLICY_REVIEW_NOT_FOUND);
    }

    return policyReview;
  }

  async getPolicyReviewByPolicy(props: GetPolicyReviewByPolicyProps) {
    // Props
    const { policy, company } = props;

    // Find the policyReview by policy and company
    const policyReview = await PolicyReviewModel.findAll({
      where: { policy, company },
    });

    return policyReview;
  }

  async getPolicyReviews(props: GetPolicyReviewsProps) {
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
        model: PolicyModel,
        as: "Policy",
        where: {
          ...filters["Policy"],
        },
      },
    ];

    // Count total policyReviews in the given company
    const count = await PolicyReviewModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all policyReviews for matching props and company
    const data = await PolicyReviewModel.findAll({
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

export default new PolicyReviewService();
