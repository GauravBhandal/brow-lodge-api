import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import maintenanceLogService from "./maintenanceLog.service";

class MaintenanceLogController {
  async createMaintenanceLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const maintenanceLog = await maintenanceLogService.createMaintenanceLog(
      props
    );

    res.status(200).json(maintenanceLog);
  }

  async updateMaintenanceLog(req: Request, res: Response) {
    const { maintenanceLogId } = req.params;
    const props = {
      id: maintenanceLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const maintenanceLog = await maintenanceLogService.updateMaintenanceLog(
      props
    );

    res.status(200).json(maintenanceLog);
  }

  async deleteMaintenanceLog(req: Request, res: Response) {
    const { maintenanceLogId } = req.params;
    const props = {
      id: maintenanceLogId,
      company: req.auth.companyId,
    };

    await maintenanceLogService.deleteMaintenanceLog(props);

    res.status(204).json();
  }

  async deleteArchiveMaintenanceLog(req: Request, res: Response) {
    const { maintenanceLogId } = req.params;
    const props = {
      id: maintenanceLogId,
      company: req.auth.companyId,
    };

    await maintenanceLogService.deleteArchiveMaintenanceLog(props);

    res.status(204).json();
  }

  async getmaintenanceLogById(req: Request, res: Response) {
    const { maintenanceLogId } = req.params;
    const props = {
      id: maintenanceLogId,
      company: req.auth.companyId,
    };

    const maintenanceLog = await maintenanceLogService.getMaintenanceLogById(
      props
    );

    res.status(200).json(maintenanceLog);
  }

  async getMaintenanceLogs(req: Request, res: Response) {
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

    const maintenanceLogs = await maintenanceLogService.getMaintenanceLogs(
      props
    );

    res.status(200).json(maintenanceLogs);
  }
}

export default new MaintenanceLogController();
