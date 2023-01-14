import { omit as _omit } from "lodash";
import { Op } from "sequelize";

import MeetingLogModel from "./meetingLog.model";
import {
  CreateMeetingLogProps,
  UpdateMeetingLogProps,
  DeleteMeetingLogProps,
  GetMeetingLogByIdProps,
  GetMeetingLogsProps,
} from "./meetingLog.types";
import { CustomError } from "../../components/errors";
import MeetingLogErrorCode from "./meetingLog.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { CompanyModel } from "../company";
import { StaffProfileModel } from "../staffProfile";
import { ClientProfileModel } from "../clientProfile";
import { addCientFiltersByTeams, getFilters } from "../../components/filters";
import { AttachmentModel } from "../attachment";
import { meetingLogAttachmentService } from "./meetingLogAttachment";

class MeetingLogService {
  async createMeetingLog(props: CreateMeetingLogProps) {
    const meetingLog = await MeetingLogModel.create(props);

    // Create attachments
    if (props.attachments && props.attachments.length) {
      await meetingLogAttachmentService.createBulkMeetingLogAttachment({
        relation: meetingLog.id,
        attachments: props.attachments,
      });
    }
    return meetingLog;
  }

  async updateMeetingLog(props: UpdateMeetingLogProps) {
    // Props
    const { id, company } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find meetingLog by id and company
    const meetingLog = await MeetingLogModel.findOne({
      where: { id, company },
    });

    // if meetingLog not found, throw an error
    if (!meetingLog) {
      throw new CustomError(404, MeetingLogErrorCode.MEETING_LOG_NOT_FOUND);
    }

    // Finally, update the meetingLog
    const [, [updatedMeetingLog]] = await MeetingLogModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    // Update attachments
    if (props.attachments) {
      await meetingLogAttachmentService.updateBulkMeetingLogAttachment({
        relation: meetingLog.id,
        attachments: props.attachments,
      });
    }
    return updatedMeetingLog;
  }

  async deleteArchiveMeetingLog(props: DeleteMeetingLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the meetingLog by id and company
    const meetingLog = await MeetingLogModel.findOne({
      where: { id, company },
    });

    // if meetingLog has been deleted, throw an error
    if (!meetingLog) {
      throw new CustomError(404, MeetingLogErrorCode.MEETING_LOG_NOT_FOUND);
    }

    if (meetingLog.archived) {
      // Check if meetingLog already exists
      const existingMeetingLog = await MeetingLogModel.findAll({
        where: {
          date: meetingLog.date,
          startTime: meetingLog.startTime,
          endTime: meetingLog.endTime,
          staff: meetingLog.staff,
          meetingType: meetingLog.meetingType,
          client: meetingLog.client,
          location: meetingLog.location,
          purpose: meetingLog.purpose,
          attendees: meetingLog.attendees,
          apologies: meetingLog.apologies,
          agenda: meetingLog.agenda,
          discussion: meetingLog.discussion,
          action: meetingLog.action,
          company: meetingLog.company,
          archived: false,
        },
      });

      if (existingMeetingLog.length > 0) {
        throw new CustomError(
          409,
          MeetingLogErrorCode.MEETING_LOG_ALREADY_EXISTS
        );
      }
    }

    // Finally, update the meetingLog update the Archive state
    const [, [updatedMeetingLog]] = await MeetingLogModel.update(
      { archived: !meetingLog.archived },
      {
        where: { id, company },
        returning: true,
      }
    );

    return updatedMeetingLog;
  }

  async deleteMeetingLog(props: DeleteMeetingLogProps) {
    // Props
    const { id, company } = props;

    // Find and delete the meetingLog by id and company
    const meetingLog = await MeetingLogModel.destroy({
      where: { id, company },
    });

    // if meetingLog has been deleted, throw an error
    if (!meetingLog) {
      throw new CustomError(404, MeetingLogErrorCode.MEETING_LOG_NOT_FOUND);
    }

    return meetingLog;
  }

  async getMeetingLogById(props: GetMeetingLogByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the meetingLog by id and company
    const meetingLog = await MeetingLogModel.findOne({
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
          required: false,
        },
        {
          model: AttachmentModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // If no meetingLog has been found, then throw an error
    if (!meetingLog) {
      throw new CustomError(404, MeetingLogErrorCode.MEETING_LOG_NOT_FOUND);
    }

    return meetingLog;
  }

  async getMeetingLogs(props: GetMeetingLogsProps, userId: string) {
    // Props
    const {
      page,
      pageSize,
      sort,
      where,
      company,
      canAccessLeadershipMeetings,
    } = props;

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
          ...clientFilters,
        },
        required: false,
        ...checkClientPermissions(),
      },
    ];

    const hasAccessForLeadershipMeetings = !canAccessLeadershipMeetings && {
      meetingType: filters["primaryFilters"]
        ? {
            [Op.and]: {
              ...filters["primaryFilters"]["meetingType"],
              [Op.ne]: "Leadership Meeting",
            },
          }
        : { [Op.ne]: "Leadership Meeting" },
    };

    // Count total meetingLogs in the given company
    const count = await MeetingLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
        ...hasAccessForLeadershipMeetings,
      },
      distinct: true,
      include,
    });

    // Find all meetingLogs for matching props and company
    const data = await MeetingLogModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
        ...hasAccessForLeadershipMeetings,
      },
      include,
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new MeetingLogService();
