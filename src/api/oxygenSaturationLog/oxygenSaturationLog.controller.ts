import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import oxygenSaturationLogService from "./oxygenSaturationLog.service";

class OxygenSaturationLogController {
  async createOxygenSaturationLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const oxygenSaturationLog =
      await oxygenSaturationLogService.createOxygenSaturationLog(props);

    res.status(200).json(oxygenSaturationLog);
  }

  async updateOxygenSaturationLog(req: Request, res: Response) {
    const { oxygenSaturationLogId } = req.params;
    const props = {
      id: oxygenSaturationLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const oxygenSaturationLog =
      await oxygenSaturationLogService.updateOxygenSaturationLog(props);

    res.status(200).json(oxygenSaturationLog);
  }

  async deleteOxygenSaturationLog(req: Request, res: Response) {
    const { oxygenSaturationLogId } = req.params;
    const props = {
      id: oxygenSaturationLogId,
      company: req.auth.companyId,
    };

    await oxygenSaturationLogService.deleteOxygenSaturationLog(props);

    res.status(204).json();
  }

  async getoxygenSaturationLogById(req: Request, res: Response) {
    const { oxygenSaturationLogId } = req.params;
    const props = {
      id: oxygenSaturationLogId,
      company: req.auth.companyId,
    };

    const oxygenSaturationLog =
      await oxygenSaturationLogService.getOxygenSaturationLogById(props);

    res.status(200).json(oxygenSaturationLog);
  }

  async getOxygenSaturationLogs(req: Request, res: Response) {
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

    const oxygenSaturationLogs =
      await oxygenSaturationLogService.getOxygenSaturationLogs(props);

    res.status(200).json(oxygenSaturationLogs);
  }
}

export default new OxygenSaturationLogController();
