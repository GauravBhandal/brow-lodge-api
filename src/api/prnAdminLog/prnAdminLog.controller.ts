import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import prnAdminLogService from "./prnAdminLog.service";

class PrnAdminLogController {
  async createPrnAdminLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const prnAdminLog = await prnAdminLogService.createPrnAdminLog(props);

    res.status(200).json(prnAdminLog);
  }

  async updatePrnAdminLog(req: Request, res: Response) {
    const { prnAdminLogId } = req.params;
    const props = {
      id: prnAdminLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const prnAdminLog = await prnAdminLogService.updatePrnAdminLog(props);

    res.status(200).json(prnAdminLog);
  }

  async deletePrnAdminLog(req: Request, res: Response) {
    const { prnAdminLogId } = req.params;
    const props = {
      id: prnAdminLogId,
      company: req.auth.companyId,
    };

    await prnAdminLogService.deletePrnAdminLog(props);

    res.status(204).json();
  }

  async deleteArchivePrnAdminLog(req: Request, res: Response) {
    const { prnAdminLogId } = req.params;
    const props = {
      id: prnAdminLogId,
      company: req.auth.companyId,
    };

    await prnAdminLogService.deleteArchivePrnAdminLog(props);

    res.status(204).json();
  }

  async getprnAdminLogById(req: Request, res: Response) {
    const { prnAdminLogId } = req.params;
    const props = {
      id: prnAdminLogId,
      company: req.auth.companyId,
    };

    const prnAdminLog = await prnAdminLogService.getPrnAdminLogById(props);

    res.status(200).json(prnAdminLog);
  }

  async getPrnAdminLogs(req: Request, res: Response) {
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

    const prnAdminLogs = await prnAdminLogService.getPrnAdminLogs(
      props,
      req.auth.userId
    );

    res.status(200).json(prnAdminLogs);
  }
}

export default new PrnAdminLogController();
