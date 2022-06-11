import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffSupervisionLogService from "./staffSupervisionLog.service";

class StaffSupervisionLogController {
  async createStaffSupervisionLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const staffSupervisionLog =
      await staffSupervisionLogService.createStaffSupervisionLog(props);

    res.status(200).json(staffSupervisionLog);
  }

  async updateStaffSupervisionLog(req: Request, res: Response) {
    const { staffSupervisionLogId } = req.params;
    const props = {
      id: staffSupervisionLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const staffSupervisionLog =
      await staffSupervisionLogService.updateStaffSupervisionLog(props);

    res.status(200).json(staffSupervisionLog);
  }

  async deleteStaffSupervisionLog(req: Request, res: Response) {
    const { staffSupervisionLogId } = req.params;
    const props = {
      id: staffSupervisionLogId,
      company: req.auth.companyId,
    };

    await staffSupervisionLogService.deleteStaffSupervisionLog(props);

    res.status(204).json();
  }

  async getstaffSupervisionLogById(req: Request, res: Response) {
    const { staffSupervisionLogId } = req.params;
    const props = {
      id: staffSupervisionLogId,
      company: req.auth.companyId,
    };

    const staffSupervisionLog =
      await staffSupervisionLogService.getStaffSupervisionLogById(props);

    res.status(200).json(staffSupervisionLog);
  }

  async getStaffSupervisionLogs(req: Request, res: Response) {
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

    const staffSupervisionLogs =
      await staffSupervisionLogService.getStaffSupervisionLogs(
        props,
        req.auth.userId
      );

    res.status(200).json(staffSupervisionLogs);
  }
}

export default new StaffSupervisionLogController();
