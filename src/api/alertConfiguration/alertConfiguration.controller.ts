import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import alertConfigurationService from "./alertConfiguration.service";

class AlertConfigurationController {
  async updateAlertConfiguration(req: Request, res: Response) {
    const bodyParams = _pick(req.body, ["payload"]);
    const props = {
      company: req.auth.companyId,
      ...bodyParams,
    };

    const alertConfiguration =
      await alertConfigurationService.updateAlertConfiguration(props);

    res.status(200).json(alertConfiguration);
  }

  async getAlertConfigurations(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const alertConfigurations =
      await alertConfigurationService.getAlertConfigurations(props);

    res.status(200).json(alertConfigurations);
  }
}

export default new AlertConfigurationController();
