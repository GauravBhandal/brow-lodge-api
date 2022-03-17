import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import sleepLogService from "./sleepLog.service";

class SleepLogController {
  async createSleepLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const sleepLog = await sleepLogService.createSleepLog(props);

    res.status(200).json(sleepLog);
  }

  async updateSleepLog(req: Request, res: Response) {
    const { sleepLogId } = req.params;
    const props = {
      id: sleepLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const sleepLog = await sleepLogService.updateSleepLog(props);

    res.status(200).json(sleepLog);
  }

  async deleteSleepLog(req: Request, res: Response) {
    const { sleepLogId } = req.params;
    const props = {
      id: sleepLogId,
      company: req.auth.companyId,
    };

    await sleepLogService.deleteSleepLog(props);

    res.status(204).json();
  }

  async getsleepLogById(req: Request, res: Response) {
    const { sleepLogId } = req.params;
    const props = {
      id: sleepLogId,
      company: req.auth.companyId,
    };

    const sleepLog = await sleepLogService.getSleepLogById(props);

    res.status(200).json(sleepLog);
  }

  async getSleepLogs(req: Request, res: Response) {
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

    const sleepLogs = await sleepLogService.getSleepLogs(
      props,
      req.auth.userId
    );

    res.status(200).json(sleepLogs);
  }
}

export default new SleepLogController();
