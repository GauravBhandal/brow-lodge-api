import { omit as _omit } from "lodash";

import ParticipantGoalModel from "./participantGoal.model";
import {
  CreateParticipantGoalProps,
  UpdateParticipantGoalProps,
  DeleteParticipantGoalProps,
  GetParticipantGoalByIdProps,
  GetParticipantGoalsProps,
} from "./participantGoal.types";
import { CustomError } from "../../components/errors";
import ParticipantGoalErrorCode from "./participantGoal.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";

class ParticipantGoalService {
  async createParticipantGoal(props: CreateParticipantGoalProps) {
    const participantGoal = await ParticipantGoalModel.create(props);
    return participantGoal;
  }

  async updateParticipantGoal(props: UpdateParticipantGoalProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find participantGoal by id and company
    const participantGoal = await ParticipantGoalModel.findOne({
      where: { id, company },
    });

    // if participantGoal not found, throw an error
    if (!participantGoal) {
      throw new CustomError(
        404,
        ParticipantGoalErrorCode.PARTICIPANT_GOAL_NOT_FOUND
      );
    }

    // Finally, update the participantGoal
    const [, [updatedParticipantGoal]] = await ParticipantGoalModel.update(
      updateProps,
      {
        where: { id, company },
        returning: true,
      }
    );
    return updatedParticipantGoal;
  }

  async deleteArchiveParticipantGoal(props: DeleteParticipantGoalProps) {
    // Props
    const { id, company } = props;

    // Find and delete the participantGoal by id and company
    const participantGoal = await ParticipantGoalModel.findOne({
      where: { id, company },
    });

    // if participantGoal has been deleted, throw an error
    if (!participantGoal) {
      throw new CustomError(
        404,
        ParticipantGoalErrorCode.PARTICIPANT_GOAL_NOT_FOUND
      );
    }

    if (participantGoal.archived) {
      // Check if participantGoal already exists
      const existingParticipantGoal = await ParticipantGoalModel.findAll({
        where: {
          title: participantGoal.title,
          client: participantGoal.client,
          description: participantGoal.description,
          strategy: participantGoal.strategy,
          support: participantGoal.support,
          startDate: participantGoal.startDate,
          staff: participantGoal.staff,
          type: participantGoal.type,
          status: participantGoal.status,
          company: participantGoal.company,
          archived: false,
        },
      });

      if (existingParticipantGoal.length > 0) {
        throw new CustomError(
          409,
          ParticipantGoalErrorCode.PARTICIPANT_GOAL_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the participantGoal update the Archive state
    const [, [updatedParticipantGoal]] = await ParticipantGoalModel.update(
      { archived: !participantGoal.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedParticipantGoal;
  }

  async deleteParticipantGoal(props: DeleteParticipantGoalProps) {
    // Props
    const { id, company } = props;

    // Find and delete the participantGoal by id and company
    const participantGoal = await ParticipantGoalModel.destroy({
      where: { id, company },
    });

    // if participantGoal has been deleted, throw an error
    if (!participantGoal) {
      throw new CustomError(
        404,
        ParticipantGoalErrorCode.PARTICIPANT_GOAL_NOT_FOUND
      );
    }

    return participantGoal;
  }

  async getParticipantGoalById(props: GetParticipantGoalByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the participantGoal by id and company
    const participantGoal = await ParticipantGoalModel.findOne({
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
          model: StaffProfileModel,
          as: "Staff",
        },
      ],
    });

    // If no participantGoal has been found, then throw an error
    if (!participantGoal) {
      throw new CustomError(
        404,
        ParticipantGoalErrorCode.PARTICIPANT_GOAL_NOT_FOUND
      );
    }

    return participantGoal;
  }

  async getParticipantGoals(props: GetParticipantGoalsProps, userId: string) {
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
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
          ...clientFilters,
        },
      },
    ];
    // Count total participantGoals in the given company
    const count = await ParticipantGoalModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all participantGoals for matching props and company
    const data = await ParticipantGoalModel.findAll({
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

export default new ParticipantGoalService();
