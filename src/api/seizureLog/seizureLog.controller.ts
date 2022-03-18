import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import seizureLogService from "./seizureLog.service";

class SeizureLogController {
  async createSeizureLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const seizureLog = await seizureLogService.createSeizureLog(props);

    res.status(200).json(seizureLog);
  }

  async updateSeizureLog(req: Request, res: Response) {
    const { seizureLogId } = req.params;
    const props = {
      id: seizureLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const seizureLog = await seizureLogService.updateSeizureLog(props);

    res.status(200).json(seizureLog);
  }

  async deleteSeizureLog(req: Request, res: Response) {
    const { seizureLogId } = req.params;
    const props = {
      id: seizureLogId,
      company: req.auth.companyId,
    };

    await seizureLogService.deleteSeizureLog(props);

    res.status(204).json();
  }

  async getseizureLogById(req: Request, res: Response) {
    const { seizureLogId } = req.params;
    const props = {
      id: seizureLogId,
      company: req.auth.companyId,
    };

    const seizureLog = await seizureLogService.getSeizureLogById(props);

    res.status(200).json(seizureLog);
  }

  async getSeizureLogs(req: Request, res: Response) {
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

    const seizureLogs = await seizureLogService.getSeizureLogs(
      props,
      req.auth.userId
    );

    res.status(200).json(seizureLogs);
  }
}

export default new SeizureLogController();
