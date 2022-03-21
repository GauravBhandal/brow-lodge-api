import { omit as _omit } from "lodash";

import PolicyModel from "./policy.model";
import {
  CreatePolicyProps,
  UpdatePolicyProps,
  DeletePolicyProps,
  GetPolicyByIdProps,
  GetPoliciesProps,
} from "./policy.types";
import { CustomError } from "../../components/errors";
import PolicyErrorCode from "./policy.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { policyAttachmentService } from "./policyAttachment";
import { AttachmentModel } from "../attachment";

class PolicyService {
  async createPolicy(props: CreatePolicyProps) {
    const policy = await PolicyModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await policyAttachmentService.createBulkPolicyAttachment({
        relation: policy.id,
        attachments: props.attachments,
      });
    }
    return policy;
  }

  async updatePolicy(props: UpdatePolicyProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find policy by id and company
    const policy = await PolicyModel.findOne({
      where: { id, company },
    });

    // if policy not found, throw an error
    if (!policy) {
      throw new CustomError(404, PolicyErrorCode.POLICY);
    }

    // Finally, update the policy
    const [, [updatedPolicy]] = await PolicyModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update attachments
    if (props.attachments) {
      await policyAttachmentService.updateBulkPolicyAttachment({
        relation: policy.id,
        attachments: props.attachments,
      });
    }

    return updatedPolicy;
  }

  async deletePolicy(props: DeletePolicyProps) {
    // Props
    const { id, company } = props;

    // Find and delete the policy by id and company
    const policy = await PolicyModel.destroy({
      where: { id, company },
    });

    // if policy has been deleted, throw an error
    if (!policy) {
      throw new CustomError(404, PolicyErrorCode.POLICY);
    }

    return policy;
  }

  async getPolicyById(props: GetPolicyByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the policy by id and company
    const policy = await PolicyModel.findOne({
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
      ],
    });

    // If no policy has been found, then throw an error
    if (!policy) {
      throw new CustomError(404, PolicyErrorCode.POLICY);
    }

    return policy;
  }

  async getPolicies(props: GetPoliciesProps, userId: string) {
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
    ];

    // Count total policies in the given company
    const count = await PolicyModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all policies for matching props and company
    const data = await PolicyModel.findAll({
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

export default new PolicyService();
