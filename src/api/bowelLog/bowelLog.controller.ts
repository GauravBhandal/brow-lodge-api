import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import bowelLogService from "./bowelLog.service";

class BowelLogController {
  async createBowelLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const bowelLog = await bowelLogService.createBowelLog(props);

    res.status(200).json(bowelLog);
  }

  async updateBowelLog(req: Request, res: Response) {
    const { bowelLogId } = req.params;
    const props = {
      id: bowelLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const bowelLog = await bowelLogService.updateBowelLog(props);

    res.status(200).json(bowelLog);
  }

  async deleteBowelLog(req: Request, res: Response) {
    const { bowelLogId } = req.params;
    const props = {
      id: bowelLogId,
      company: req.auth.companyId,
    };

    await bowelLogService.deleteBowelLog(props);

    res.status(204).json();
  }

  async getbowelLogById(req: Request, res: Response) {
    const { bowelLogId } = req.params;
    const props = {
      id: bowelLogId,
      company: req.auth.companyId,
    };

    const bowelLog = await bowelLogService.getBowelLogById(props);

    res.status(200).json(bowelLog);
  }

  async getBowelLogs(req: Request, res: Response) {
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

    const bowelLogs = await bowelLogService.getBowelLogs(props);

    res.status(200).json(bowelLogs);
  }
}

export default new BowelLogController();
