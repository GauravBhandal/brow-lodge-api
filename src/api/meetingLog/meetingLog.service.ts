import { omit as _omit } from "lodash";

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
import { getFilters } from "../../components/filters";

class MeetingLogService {
  async createMeetingLog(props: CreateMeetingLogProps) {
    const meetingLog = await MeetingLogModel.create(props);
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
      ],
    });

    // If no meetingLog has been found, then throw an error
    if (!meetingLog) {
      throw new CustomError(404, MeetingLogErrorCode.MEETING_LOG_NOT_FOUND);
    }

    return meetingLog;
  }

  async getMeetingLogs(props: GetMeetingLogsProps) {
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
      {
        model: ClientProfileModel,
        as: "Client",
        where: {
          ...filters["Client"],
        },
        required: false,
      },
    ];

    // Count total meetingLogs in the given company
    const count = await MeetingLogModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
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
      },
      include,
    });

    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new MeetingLogService();
