import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import bloodPressureLogService from "./bloodPressureLog.service";

class BloodPressureLogController {
  async createBloodPressureLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const bloodPressureLog =
      await bloodPressureLogService.createBloodPressureLog(props);

    res.status(200).json(bloodPressureLog);
  }

  async updateBloodPressureLog(req: Request, res: Response) {
    const { bloodPressureLogId } = req.params;
    const props = {
      id: bloodPressureLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const bloodPressureLog =
      await bloodPressureLogService.updateBloodPressureLog(props);

    res.status(200).json(bloodPressureLog);
  }

  async deleteBloodPressureLog(req: Request, res: Response) {
    const { bloodPressureLogId } = req.params;
    const props = {
      id: bloodPressureLogId,
      company: req.auth.companyId,
    };

    await bloodPressureLogService.deleteBloodPressureLog(props);

    res.status(204).json();
  }

  async deleteArchiveBloodPressureLog(req: Request, res: Response) {
    const { bloodPressureLogId } = req.params;
    const props = {
      id: bloodPressureLogId,
      company: req.auth.companyId,
    };

    await bloodPressureLogService.deleteArchiveBloodPressureLog(props);

    res.status(204).json();
  }

  async getbloodPressureLogById(req: Request, res: Response) {
    const { bloodPressureLogId } = req.params;
    const props = {
      id: bloodPressureLogId,
      company: req.auth.companyId,
    };

    const bloodPressureLog =
      await bloodPressureLogService.getBloodPressureLogById(props);

    res.status(200).json(bloodPressureLog);
  }

  async getBloodPressureLogs(req: Request, res: Response) {
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

    const bloodPressureLogs =
      await bloodPressureLogService.getBloodPressureLogs(
        props,
        req.auth.userId
      );

    res.status(200).json(bloodPressureLogs);
  }
}

export default new BloodPressureLogController();
