import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import meetingLogService from "./meetingLog.service";

class MeetingLogController {
  async createMeetingLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const meetingLog = await meetingLogService.createMeetingLog(props);

    res.status(200).json(meetingLog);
  }

  async updateMeetingLog(req: Request, res: Response) {
    const { meetingLogId } = req.params;
    const props = {
      id: meetingLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const meetingLog = await meetingLogService.updateMeetingLog(props);

    res.status(200).json(meetingLog);
  }

  async deleteMeetingLog(req: Request, res: Response) {
    const { meetingLogId } = req.params;
    const props = {
      id: meetingLogId,
      company: req.auth.companyId,
    };

    await meetingLogService.deleteMeetingLog(props);

    res.status(204).json();
  }

  async getmeetingLogById(req: Request, res: Response) {
    const { meetingLogId } = req.params;
    const props = {
      id: meetingLogId,
      company: req.auth.companyId,
    };

    const meetingLog = await meetingLogService.getMeetingLogById(props);

    res.status(200).json(meetingLog);
  }

  async getMeetingLogs(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;

    const props = {
      company: req.auth.companyId,
      ...queryParams,
      canAccessLeadershipMeetings: req.ability.can("read", "leadershipMeeting"),
    };

    const meetingLogs = await meetingLogService.getMeetingLogs(
      props,
      req.auth.userId
    );

    res.status(200).json(meetingLogs);
  }
}

export default new MeetingLogController();
