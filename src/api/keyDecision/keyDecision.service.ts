import { omit as _omit } from "lodash";

import KeyDecisionModel from "./keyDecision.model";
import {
  CreateKeyDecisionProps,
  UpdateKeyDecisionProps,
  DeleteKeyDecisionProps,
  GetKeyDecisionByIdProps,
  GetKeyDecisionsProps,
} from "./keyDecision.types";
import { CustomError } from "../../components/errors";
import KeyDecisionErrorCode from "./keyDecision.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { getFilters } from "../../components/filters";

class KeyDecisionService {
  async createKeyDecision(props: CreateKeyDecisionProps) {
    const keyDecision = await KeyDecisionModel.create(props);
    return keyDecision;
  }

  async updateKeyDecision(props: UpdateKeyDecisionProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find keyDecision by id and company
    const keyDecision = await KeyDecisionModel.findOne({
      where: { id, company },
    });

    // if keyDecision not found, throw an error
    if (!keyDecision) {
      throw new CustomError(404, KeyDecisionErrorCode.KEY_DECISION_NOT_FOUND);
    }

    // Finally, update the keyDecision
    const [, [updatedKeyDecision]] = await KeyDecisionModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedKeyDecision;
  }

  async deleteArchiveKeyDecision(props: DeleteKeyDecisionProps) {
    // Props
    const { id, company } = props;

    // Find and delete the keyDecision by id and company
    const keyDecision = await KeyDecisionModel.findOne({
      where: { id, company },
    });

    // if keyDecision has been deleted, throw an error
    if (!keyDecision) {
      throw new CustomError(404, KeyDecisionErrorCode.KEY_DECISION_NOT_FOUND);
    }

    if (keyDecision.archived) {
      // Check if document already exists
      const existingKeyDecision = await KeyDecisionModel.findAll({
        where: {
          date: keyDecision.date,
          decisionRationale: keyDecision.decisionRationale,
          staff: keyDecision.staff,
          description: keyDecision.description,
          company: keyDecision.company,
          archived: false,
        },
      });

      if (existingKeyDecision.length > 0) {
        throw new CustomError(
          409,
          KeyDecisionErrorCode.KEY_DECISION_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the keyDecision update the Archive state
    const [, [updatedKeyDecision]] = await KeyDecisionModel.update(
      { archived: !keyDecision.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedKeyDecision;
  }

  async deleteKeyDecision(props: DeleteKeyDecisionProps) {
    // Props
    const { id, company } = props;

    // Find and delete the keyDecision by id and company
    const keyDecision = await KeyDecisionModel.destroy({
      where: { id, company },
    });

    // if keyDecision has been deleted, throw an error
    if (!keyDecision) {
      throw new CustomError(404, KeyDecisionErrorCode.KEY_DECISION_NOT_FOUND);
    }

    return keyDecision;
  }

  async getKeyDecisionById(props: GetKeyDecisionByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the keyDecision by id and company
    const keyDecision = await KeyDecisionModel.findOne({
      where: { id, company },
      include: [
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no keyDecision has been found, then throw an error
    if (!keyDecision) {
      throw new CustomError(404, KeyDecisionErrorCode.KEY_DECISION_NOT_FOUND);
    }

    return keyDecision;
  }

  async getKeyDecisions(props: GetKeyDecisionsProps) {
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
        where: {
          ...filters["Staff"],
        },
      },
    ];

    // Count total keyDecisions in the given company
    const count = await KeyDecisionModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all keyDecisions for matching props and company
    const data = await KeyDecisionModel.findAll({
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

export default new KeyDecisionService();
