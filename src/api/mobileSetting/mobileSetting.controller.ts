import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import mobileSettingService from "./mobileSetting.service";

class MobileSettingController {
  async updateMobileSetting(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const mobileSetting = await mobileSettingService.updateMobileSetting(props);

    res.status(200).json(mobileSetting);
  }

  async getMobileSettings(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const mobileSettings = await mobileSettingService.getMobileSettings(props);

    res.status(200).json(mobileSettings);
  }
}

export default new MobileSettingController();
