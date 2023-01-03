import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import onCallLogService from "./onCallLog.service";

class OnCallLogController {
  async createOnCallLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const onCallLog = await onCallLogService.createOnCallLog(props);

    res.status(200).json(onCallLog);
  }

  async updateOnCallLog(req: Request, res: Response) {
    const { onCallLogId } = req.params;
    const props = {
      id: onCallLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const onCallLog = await onCallLogService.updateOnCallLog(props);

    res.status(200).json(onCallLog);
  }

  async deleteOnCallLog(req: Request, res: Response) {
    const { onCallLogId } = req.params;
    const props = {
      id: onCallLogId,
      company: req.auth.companyId,
    };

    await onCallLogService.deleteOnCallLog(props);

    res.status(204).json();
  }

  async deleteArchiveOnCallLog(req: Request, res: Response) {
    const { onCallLogId } = req.params;
    const props = {
      id: onCallLogId,
      company: req.auth.companyId,
    };

    await onCallLogService.deleteArchiveOnCallLog(props);

    res.status(204).json();
  }

  async getonCallLogById(req: Request, res: Response) {
    const { onCallLogId } = req.params;
    const props = {
      id: onCallLogId,
      company: req.auth.companyId,
    };

    const onCallLog = await onCallLogService.getOnCallLogById(props);

    res.status(200).json(onCallLog);
  }

  async getOnCallLogs(req: Request, res: Response) {
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

    const onCallLogs = await onCallLogService.getOnCallLogs(
      props,
      req.auth.userId
    );

    res.status(200).json(onCallLogs);
  }
}

export default new OnCallLogController();
