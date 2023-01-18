import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import ParticipantCommunicationLogModel from "./participantCommunicationLog.model";
import {
  CreateParticipantCommunicationLogProps,
  UpdateParticipantCommunicationLogProps,
  DeleteParticipantCommunicationLogProps,
  GetParticipantCommunicationLogByIdProps,
  GetParticipantCommunicationLogsProps,
} from "./participantCommunicationLog.types";
import { CustomError } from "../../components/errors";
import ParticipantCommunicationLogErrorCode from "./participantCommunicationLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { ClientProfileModel } from "../clientProfile";
import { StaffProfileModel } from "../staffProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { participantCommunicationLogAttachmentService } from "./participantCommunicationLogAttachment";
import { AttachmentModel } from "../attachment";

class ParticipantCommunicationLogService {
  async createParticipantCommunicationLog(
    props: CreateParticipantCommunicationLogProps
  ) {
    const participantCommunicationLog =
      await ParticipantCommunicationLogModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await participantCommunicationLogAttachmentService.createBulkParticipantCommunicationLogAttachment(
        {
          relation: participantCommunicationLog.id,
          attachments: props.attachments,
        }
      );
    }

    return participantCommunicationLog;
  }

  async updateParticipantCommunicationLog(
    props: UpdateParticipantCommunicationLogProps
  ) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find participantCommunicationLog by id and company
    const participantCommunicationLog =
      await ParticipantCommunicationLogModel.findOne({
        where: { id, company },
      });

    // if participantCommunicationLog not found, throw an error
    if (!participantCommunicationLog) {
      throw new CustomError(
        404,
        ParticipantCommunicationLogErrorCode.PARTICIPANT_COMMUNICATION_LOG_NOT_FOUND
      );
    }

    // Finally, update the participantCommunicationLog
    const [, [updatedParticipantCommunicationLog]] =
      await ParticipantCommunicationLogModel.update(updateProps, {
        where: { id, company },
        returning: true,
      });

    // Update attachments
    if (props.attachments) {
      await participantCommunicationLogAttachmentService.updateBulkParticipantCommunicationLogAttachment(
        {
          relation: participantCommunicationLog.id,
          attachments: props.attachments,
        }
      );
    }
    return updatedParticipantCommunicationLog;
  }

  async deleteArchiveParticipantCommunicationLog(
    props: DeleteParticipantCommunicationLogProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the participantCommunicationLog by id and company
    const participantCommunicationLog =
      await ParticipantCommunicationLogModel.findOne({
        where: { id, company },
      });

    // if participantCommunicationLog has been deleted, throw an error
    if (!participantCommunicationLog) {
      throw new CustomError(
        404,
        ParticipantCommunicationLogErrorCode.PARTICIPANT_COMMUNICATION_LOG_NOT_FOUND
      );
    }

    if (participantCommunicationLog.archived) {
      // Check if participantCommunicationLog already exists
      const existingParticipantCommunicationLog =
        await ParticipantCommunicationLogModel.findAll({
          where: {
            date: participantCommunicationLog.date,
            time: participantCommunicationLog.time,
            staff: participantCommunicationLog.staff,
            client: participantCommunicationLog.client,
            subject: participantCommunicationLog.subject,
            description: participantCommunicationLog.description,
            company: participantCommunicationLog.company,
            archived: false,
          },
        });

      if (existingParticipantCommunicationLog.length > 0) {
        throw new CustomError(
          409,
          ParticipantCommunicationLogErrorCode.PARTICIPANT_COMMUNICATION_LOG_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the participantCommunicationLog update the Archive state
    const [, [updatedParticipantCommunicationLog]] =
      await ParticipantCommunicationLogModel.update(
        { archived: !participantCommunicationLog.archived },
        {
          where: { id, company },
          returning: true,
        }
      );

    return updatedParticipantCommunicationLog;
  }

  async deleteParticipantCommunicationLog(
    props: DeleteParticipantCommunicationLogProps
  ) {
    // Props
    const { id, company } = props;

    // Find and delete the participantCommunicationLog by id and company
    const participantCommunicationLog =
      await ParticipantCommunicationLogModel.destroy({
        where: { id, company },
      });

    // if participantCommunicationLog has been deleted, throw an error
    if (!participantCommunicationLog) {
      throw new CustomError(
        404,
        ParticipantCommunicationLogErrorCode.PARTICIPANT_COMMUNICATION_LOG_NOT_FOUND
      );
    }

    return participantCommunicationLog;
  }

  async getParticipantCommunicationLogById(
    props: GetParticipantCommunicationLogByIdProps
  ) {
    // Props
    const { id, company } = props;

    // Find  the participantCommunicationLog by id and company
    const participantCommunicationLog =
      await ParticipantCommunicationLogModel.findOne({
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
            model: ClientProfileModel,
            as: "Client",
          },
          {
            model: AttachmentModel,
            through: {
              attributes: [],
            },
          },
        ],
      });

    // If no participantCommunicationLog has been found, then throw an error
    if (!participantCommunicationLog) {
      throw new CustomError(
        404,
        ParticipantCommunicationLogErrorCode.PARTICIPANT_COMMUNICATION_LOG_NOT_FOUND
      );
    }

    return participantCommunicationLog;
  }

  async getParticipantCommunicationLogs(
    props: GetParticipantCommunicationLogsProps,
    userId: string
  ) {
    // Props
    const { page, pageSize, sort, where, company } = props;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);
    const clientFilters = await addCientFiltersByTeams(userId, company);

    // func to check for optional clients that to apply team permissions or not
    const checkClientPermissions = () => {
      if (Object.keys(clientFilters).length !== 0) {
        return { right: true };
      }
    };

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
        ...checkClientPermissions(),
      },
    ];
    // Count total participantCommunicationLogs in the given company
    const count = await ParticipantCommunicationLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      distinct: true,
      include,
    });

    // Find all participantCommunicationLogs for matching props and company
    const data = await ParticipantCommunicationLogModel.findAll({
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

export default new ParticipantCommunicationLogService();
