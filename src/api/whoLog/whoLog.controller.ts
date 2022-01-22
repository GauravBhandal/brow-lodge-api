import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import whoLogService from "./whoLog.service";

class WhoLogController {
  async createWhoLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const whoLog = await whoLogService.createWhoLog(props);

    res.status(200).json(whoLog);
  }

  async updateWhoLog(req: Request, res: Response) {
    const { whoLogId } = req.params;
    const props = {
      id: whoLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const whoLog = await whoLogService.updateWhoLog(props);

    res.status(200).json(whoLog);
  }

  async deleteWhoLog(req: Request, res: Response) {
    const { whoLogId } = req.params;
    const props = {
      id: whoLogId,
      company: req.auth.companyId,
    };

    await whoLogService.deleteWhoLog(props);

    res.status(204).json();
  }

  async getwhoLogById(req: Request, res: Response) {
    const { whoLogId } = req.params;
    const props = {
      id: whoLogId,
      company: req.auth.companyId,
    };

    const whoLog = await whoLogService.getWhoLogById(props);

    res.status(200).json(whoLog);
  }

  async getWhoLogs(req: Request, res: Response) {
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

    const whoLogs = await whoLogService.getWhoLogs(props);

    res.status(200).json(whoLogs);
  }
}

export default new WhoLogController();
