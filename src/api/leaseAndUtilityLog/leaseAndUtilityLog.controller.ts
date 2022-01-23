import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import leaseAndUtilityLogService from "./leaseAndUtilityLog.service";

class LeaseAndUtilityLogController {
  async createLeaseAndUtilityLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const leaseAndUtilityLog =
      await leaseAndUtilityLogService.createLeaseAndUtilityLog(props);

    res.status(200).json(leaseAndUtilityLog);
  }

  async updateLeaseAndUtilityLog(req: Request, res: Response) {
    const { leaseAndUtilityLogId } = req.params;
    const props = {
      id: leaseAndUtilityLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const leaseAndUtilityLog =
      await leaseAndUtilityLogService.updateLeaseAndUtilityLog(props);

    res.status(200).json(leaseAndUtilityLog);
  }

  async deleteLeaseAndUtilityLog(req: Request, res: Response) {
    const { leaseAndUtilityLogId } = req.params;
    const props = {
      id: leaseAndUtilityLogId,
      company: req.auth.companyId,
    };

    await leaseAndUtilityLogService.deleteLeaseAndUtilityLog(props);

    res.status(204).json();
  }

  async getleaseAndUtilityLogById(req: Request, res: Response) {
    const { leaseAndUtilityLogId } = req.params;
    const props = {
      id: leaseAndUtilityLogId,
      company: req.auth.companyId,
    };

    const leaseAndUtilityLog =
      await leaseAndUtilityLogService.getLeaseAndUtilityLogById(props);

    res.status(200).json(leaseAndUtilityLog);
  }

  async getLeaseAndUtilityLogs(req: Request, res: Response) {
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

    const leaseAndUtilityLogs =
      await leaseAndUtilityLogService.getLeaseAndUtilityLogs(props);

    res.status(200).json(leaseAndUtilityLogs);
  }
}

export default new LeaseAndUtilityLogController();
