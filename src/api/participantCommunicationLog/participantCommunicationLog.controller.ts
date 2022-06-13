import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import participantCommunicationLogService from "./participantCommunicationLog.service";

class ParticipantCommunicationLogController {
  async createParticipantCommunicationLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const participantCommunicationLog =
      await participantCommunicationLogService.createParticipantCommunicationLog(
        props
      );

    res.status(200).json(participantCommunicationLog);
  }

  async updateParticipantCommunicationLog(req: Request, res: Response) {
    const { participantCommunicationLogId } = req.params;
    const props = {
      id: participantCommunicationLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const participantCommunicationLog =
      await participantCommunicationLogService.updateParticipantCommunicationLog(
        props
      );

    res.status(200).json(participantCommunicationLog);
  }

  async deleteParticipantCommunicationLog(req: Request, res: Response) {
    const { participantCommunicationLogId } = req.params;
    const props = {
      id: participantCommunicationLogId,
      company: req.auth.companyId,
    };

    await participantCommunicationLogService.deleteParticipantCommunicationLog(
      props
    );

    res.status(204).json();
  }

  async getparticipantCommunicationLogById(req: Request, res: Response) {
    const { participantCommunicationLogId } = req.params;
    const props = {
      id: participantCommunicationLogId,
      company: req.auth.companyId,
    };

    const participantCommunicationLog =
      await participantCommunicationLogService.getParticipantCommunicationLogById(
        props
      );

    res.status(200).json(participantCommunicationLog);
  }

  async getParticipantCommunicationLogs(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;
    const props = {
      company: req.auth.companyId,
      ...queryParams,
    };

    const participantCommunicationLogs =
      await participantCommunicationLogService.getParticipantCommunicationLogs(
        props,
        req.auth.userId
      );

    res.status(200).json(participantCommunicationLogs);
  }
}

export default new ParticipantCommunicationLogController();
