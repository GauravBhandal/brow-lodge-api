import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import vehicleLogService from "./vehicleLog.service";

class VehicleLogController {
  async createVehicleLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const vehicleLog = await vehicleLogService.createVehicleLog(props);

    res.status(200).json(vehicleLog);
  }

  async updateVehicleLog(req: Request, res: Response) {
    const { vehicleLogId } = req.params;
    const props = {
      id: vehicleLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const vehicleLog = await vehicleLogService.updateVehicleLog(props);

    res.status(200).json(vehicleLog);
  }

  async deleteVehicleLog(req: Request, res: Response) {
    const { vehicleLogId } = req.params;
    const props = {
      id: vehicleLogId,
      company: req.auth.companyId,
    };

    await vehicleLogService.deleteVehicleLog(props);

    res.status(204).json();
  }

  async getvehicleLogById(req: Request, res: Response) {
    const { vehicleLogId } = req.params;
    const props = {
      id: vehicleLogId,
      company: req.auth.companyId,
    };

    const vehicleLog = await vehicleLogService.getVehicleLogById(props);

    res.status(200).json(vehicleLog);
  }

  async getVehicleLogs(req: Request, res: Response) {
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

    const vehicleLogs = await vehicleLogService.getVehicleLogs(
      props,
      req.auth.userId
    );

    res.status(200).json(vehicleLogs);
  }
}

export default new VehicleLogController();
