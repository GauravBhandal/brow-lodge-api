import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import temperatureLogService from "./temperatureLog.service";

class TemperatureLogController {
  async createTemperatureLog(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const temperatureLog = await temperatureLogService.createTemperatureLog(
      props
    );

    res.status(200).json(temperatureLog);
  }

  async updateTemperatureLog(req: Request, res: Response) {
    const { temperatureLogId } = req.params;
    const props = {
      id: temperatureLogId,
      company: req.auth.companyId,
      ...req.body,
    };

    const temperatureLog = await temperatureLogService.updateTemperatureLog(
      props
    );

    res.status(200).json(temperatureLog);
  }

  async deleteTemperatureLog(req: Request, res: Response) {
    const { temperatureLogId } = req.params;
    const props = {
      id: temperatureLogId,
      company: req.auth.companyId,
    };

    await temperatureLogService.deleteTemperatureLog(props);

    res.status(204).json();
  }

  async gettemperatureLogById(req: Request, res: Response) {
    const { temperatureLogId } = req.params;
    const props = {
      id: temperatureLogId,
      company: req.auth.companyId,
    };

    const temperatureLog = await temperatureLogService.getTemperatureLogById(
      props
    );

    res.status(200).json(temperatureLog);
  }

  async getTemperatureLogs(req: Request, res: Response) {
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

    const temperatureLogs = await temperatureLogService.getTemperatureLogs(
      props
    );

    res.status(200).json(temperatureLogs);
  }
}

export default new TemperatureLogController();
