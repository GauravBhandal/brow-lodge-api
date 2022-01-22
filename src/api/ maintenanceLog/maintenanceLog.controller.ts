import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import maintenanceLogService from "./ maintenanceLog.service";

class  MaintenanceLogController {
  async create MaintenanceLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const maintenanceLog = await maintenanceLogService.create MaintenanceLog(props);

    res.status(200).json(maintenanceLog);
  }

  async update MaintenanceLog(req: Request, res: Response) {
    const { maintenanceLogId } = req.params;
    const props = {
      id: maintenanceLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const maintenanceLog = await maintenanceLogService.update MaintenanceLog(props);

    res.status(200).json(maintenanceLog);
  }

  async delete MaintenanceLog(req: Request, res: Response) {
    const { maintenanceLogId } = req.params;
    const props = {
      id: maintenanceLogId,
      company: req.auth.companyId,
    };

    await maintenanceLogService.delete MaintenanceLog(props);

    res.status(204).json();
  }

  get maintenanceLogById(req: Request, res: Response) {
    const { maintenanceLogId } = req.params;
    const props = {
      id: maintenanceLogId,
      company: req.auth.companyId,
    };

    const maintenanceLog = await maintenanceLogService.get MaintenanceLogById(props);

    res.status(200).json(maintenanceLog);
  }

  async get MaintenanceLogs(req: Request, res: Response) {
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

    const maintenanceLogs = await maintenanceLogService.get MaintenanceLogs(props);

    res.status(200).json(maintenanceLogs);
  }
}

export default new  MaintenanceLogController();
