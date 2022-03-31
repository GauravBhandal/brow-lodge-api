import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import restrictivePracticeLogService from "./restrictivePracticeLog.service";

class RestrictivePracticeLogController {
  async createRestrictivePracticeLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const restrictivePracticeLog =
      await restrictivePracticeLogService.createRestrictivePracticeLog(props);

    res.status(200).json(restrictivePracticeLog);
  }

  async updateRestrictivePracticeLog(req: Request, res: Response) {
    const { restrictivePracticeLogId } = req.params;
    const props = {
      id: restrictivePracticeLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const restrictivePracticeLog =
      await restrictivePracticeLogService.updateRestrictivePracticeLog(props);

    res.status(200).json(restrictivePracticeLog);
  }

  async deleteRestrictivePracticeLog(req: Request, res: Response) {
    const { restrictivePracticeLogId } = req.params;
    const props = {
      id: restrictivePracticeLogId,
      company: req.auth.companyId,
    };

    await restrictivePracticeLogService.deleteRestrictivePracticeLog(props);

    res.status(204).json();
  }

  async getrestrictivePracticeLogById(req: Request, res: Response) {
    const { restrictivePracticeLogId } = req.params;
    const props = {
      id: restrictivePracticeLogId,
      company: req.auth.companyId,
    };

    const restrictivePracticeLog =
      await restrictivePracticeLogService.getRestrictivePracticeLogById(props);

    res.status(200).json(restrictivePracticeLog);
  }

  async getRestrictivePracticeLogs(req: Request, res: Response) {
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

    const restrictivePracticeLogs =
      await restrictivePracticeLogService.getRestrictivePracticeLogs(
        props,
        req.auth.userId
      );

    res.status(200).json(restrictivePracticeLogs);
  }
}

export default new RestrictivePracticeLogController();
