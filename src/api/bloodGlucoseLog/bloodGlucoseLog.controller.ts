import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import bloodGlucoseLogService from "./bloodGlucoseLog.service";

class BloodGlucoseLogController {
  async createBloodGlucoseLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const bloodGlucoseLog = await bloodGlucoseLogService.createBloodGlucoseLog(
      props
    );

    res.status(200).json(bloodGlucoseLog);
  }

  async updateBloodGlucoseLog(req: Request, res: Response) {
    const { bloodGlucoseLogId } = req.params;
    const props = {
      id: bloodGlucoseLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const bloodGlucoseLog = await bloodGlucoseLogService.updateBloodGlucoseLog(
      props
    );

    res.status(200).json(bloodGlucoseLog);
  }

  async deleteBloodGlucoseLog(req: Request, res: Response) {
    const { bloodGlucoseLogId } = req.params;
    const props = {
      id: bloodGlucoseLogId,
      company: req.auth.companyId,
    };

    await bloodGlucoseLogService.deleteBloodGlucoseLog(props);

    res.status(204).json();
  }

  async getbloodGlucoseLogById(req: Request, res: Response) {
    const { bloodGlucoseLogId } = req.params;
    const props = {
      id: bloodGlucoseLogId,
      company: req.auth.companyId,
    };

    const bloodGlucoseLog = await bloodGlucoseLogService.getBloodGlucoseLogById(
      props
    );

    res.status(200).json(bloodGlucoseLog);
  }

  async getBloodGlucoseLogs(req: Request, res: Response) {
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

    const bloodGlucoseLogs = await bloodGlucoseLogService.getBloodGlucoseLogs(
      props
    );

    res.status(200).json(bloodGlucoseLogs);
  }
}

export default new BloodGlucoseLogController();
