import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import weightLogService from "./weightLog.service";

class WeightLogController {
  async createWeightLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const weightLog = await weightLogService.createWeightLog(props);

    res.status(200).json(weightLog);
  }

  async updateWeightLog(req: Request, res: Response) {
    const { weightLogId } = req.params;
    const props = {
      id: weightLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const weightLog = await weightLogService.updateWeightLog(props);

    res.status(200).json(weightLog);
  }

  async deleteWeightLog(req: Request, res: Response) {
    const { weightLogId } = req.params;
    const props = {
      id: weightLogId,
      company: req.auth.companyId,
    };

    await weightLogService.deleteWeightLog(props);

    res.status(204).json();
  }

  async getweightLogById(req: Request, res: Response) {
    const { weightLogId } = req.params;
    const props = {
      id: weightLogId,
      company: req.auth.companyId,
    };

    const weightLog = await weightLogService.getWeightLogById(props);

    res.status(200).json(weightLog);
  }

  async getWeightLogs(req: Request, res: Response) {
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

    const weightLogs = await weightLogService.getWeightLogs(props);

    res.status(200).json(weightLogs);
  }
}

export default new WeightLogController();
