import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import whsLogService from "./whsLog.service";

class WhsLogController {
  async createWhsLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const whsLog = await whsLogService.createWhsLog(props);

    res.status(200).json(whsLog);
  }

  async updateWhsLog(req: Request, res: Response) {
    const { whsLogId } = req.params;
    const props = {
      id: whsLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const whsLog = await whsLogService.updateWhsLog(props);

    res.status(200).json(whsLog);
  }

  async deleteWhsLog(req: Request, res: Response) {
    const { whsLogId } = req.params;
    const props = {
      id: whsLogId,
      company: req.auth.companyId,
    };

    await whsLogService.deleteWhsLog(props);

    res.status(204).json();
  }

  async getwhsLogById(req: Request, res: Response) {
    const { whsLogId } = req.params;
    const props = {
      id: whsLogId,
      company: req.auth.companyId,
    };

    const whsLog = await whsLogService.getWhsLogById(props);

    res.status(200).json(whsLog);
  }

  async getWhsLogs(req: Request, res: Response) {
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

    const whsLogs = await whsLogService.getWhsLogs(props, req.auth.userId);

    res.status(200).json(whsLogs);
  }
}

export default new WhsLogController();
