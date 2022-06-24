import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import progressNoteSettingsService from "./progressNoteSettings.service";

class ProgressNoteSettingsController {
  async updateProgressNoteSettings(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const progressNoteSettings =
      await progressNoteSettingsService.updateProgressNoteSettings(props);

    res.status(200).json(progressNoteSettings);
  }

  async getProgressNoteSettings(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const progressNoteSettings =
      await progressNoteSettingsService.getProgressNoteSettings(props);

    res.status(200).json(progressNoteSettings);
  }
}

export default new ProgressNoteSettingsController();
