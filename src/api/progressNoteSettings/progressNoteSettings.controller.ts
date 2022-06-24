import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import progressNoteSettingservice from "./progressNoteSettings.service";

class ProgressNoteSettingsController {
  async updateProgressNoteSettings(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const progressNoteSettings =
      await progressNoteSettingservice.updateProgressNoteSettings(props);

    res.status(200).json(progressNoteSettings);
  }

  async getProgressNoteSettings(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const progressNoteSettings =
      await progressNoteSettingservice.getProgressNoteSettings(props);

    res.status(200).json(progressNoteSettings);
  }
}

export default new ProgressNoteSettingsController();
