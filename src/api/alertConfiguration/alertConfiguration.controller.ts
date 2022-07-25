import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import alertConfigurationService from "./alertConfiguration.service";

class AlertConfigurationController {
  async createAlertConfiguration(req: Request, res: Response) {
    const bodyParams = _pick(req.body, ["name", "description", "permissions"]);
    const props = {
      company: req.auth.companyId,
      ...bodyParams,
    };

    const alertConfiguration = await alertConfigurationService.createAlertConfiguration(props);

    res.status(200).json(alertConfiguration);
  }

  async updateAlertConfiguration(req: Request, res: Response) {
    const { alertConfigurationId } = req.params;
    const bodyParams = _pick(req.body, ["name", "description", "permissions"]);
    const props = {
      id: alertConfigurationId,
      company: req.auth.companyId,
      ...bodyParams,
    };

    const alertConfiguration = await alertConfigurationService.updateAlertConfiguration(props);

    res.status(200).json(alertConfiguration);
  }

  async deleteAlertConfiguration(req: Request, res: Response) {
    const { alertConfigurationId } = req.params;
    const props = {
      id: alertConfigurationId,
      company: req.auth.companyId,
    };

    await alertConfigurationService.deleteAlertConfiguration(props);

    res.status(204).json();
  }

  async getalertConfigurationById(req: Request, res: Response) {
    const { alertConfigurationId } = req.params;
    const props = {
      id: alertConfigurationId,
      company: req.auth.companyId,
    };

    const alertConfiguration = await alertConfigurationService.getAlertConfigurationById(props);

    res.status(200).json(alertConfiguration);
  }

  async getAlertConfigurations(req: Request, res: Response) {
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

    const alertConfigurations = await alertConfigurationService.getAlertConfigurations(props);

    res.status(200).json(alertConfigurations);
  }
}

export default new AlertConfigurationController();
