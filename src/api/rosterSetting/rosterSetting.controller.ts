import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import rosterSettingService from "./rosterSetting.service";

class RosterSettingController {
  async updateRosterSetting(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const rosterSetting = await rosterSettingService.updateRosterSetting(props);

    res.status(200).json(rosterSetting);
  }

  async getRosterSetting(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const rosterSetting = await rosterSettingService.getRosterSettingById(
      props
    );

    res.status(200).json(rosterSetting);
  }
}

export default new RosterSettingController();
