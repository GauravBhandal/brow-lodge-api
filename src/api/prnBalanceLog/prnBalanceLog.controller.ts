import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import prnBalanceLogService from "./prnBalanceLog.service";

class PrnBalanceLogController {
  async createPrnBalanceLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const prnBalanceLog = await prnBalanceLogService.createPrnBalanceLog(props);

    res.status(200).json(prnBalanceLog);
  }

  async updatePrnBalanceLog(req: Request, res: Response) {
    const { prnBalanceLogId } = req.params;
    const props = {
      id: prnBalanceLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const prnBalanceLog = await prnBalanceLogService.updatePrnBalanceLog(props);

    res.status(200).json(prnBalanceLog);
  }

  async deletePrnBalanceLog(req: Request, res: Response) {
    const { prnBalanceLogId } = req.params;
    const props = {
      id: prnBalanceLogId,
      company: req.auth.companyId,
    };

    await prnBalanceLogService.deletePrnBalanceLog(props);

    res.status(204).json();
  }

  async getprnBalanceLogById(req: Request, res: Response) {
    const { prnBalanceLogId } = req.params;
    const props = {
      id: prnBalanceLogId,
      company: req.auth.companyId,
    };

    const prnBalanceLog = await prnBalanceLogService.getPrnBalanceLogById(
      props
    );

    res.status(200).json(prnBalanceLog);
  }

  async getPrnBalanceLogs(req: Request, res: Response) {
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

    const prnBalanceLogs = await prnBalanceLogService.getPrnBalanceLogs(
      props,
      req.auth.userId
    );

    res.status(200).json(prnBalanceLogs);
  }
}

export default new PrnBalanceLogController();
