import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import progressNotesSettingService from "./progressNotesSetting.service";

class ProgressNotesSettingController {
  async createProgressNotesSetting(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const progressNotesSetting =
      await progressNotesSettingService.createProgressNotesSetting(props);

    res.status(200).json(progressNotesSetting);
  }

  async updateProgressNotesSetting(req: Request, res: Response) {
    const { progressNotesSettingId } = req.params;
    const props = {
      id: progressNotesSettingId,
      company: req.auth.companyId,
      ...req.body,
    };

    const progressNotesSetting =
      await progressNotesSettingService.updateProgressNotesSetting(props);

    res.status(200).json(progressNotesSetting);
  }

  async deleteProgressNotesSetting(req: Request, res: Response) {
    const { progressNotesSettingId } = req.params;
    const props = {
      id: progressNotesSettingId,
      company: req.auth.companyId,
    };

    await progressNotesSettingService.deleteProgressNotesSetting(props);

    res.status(204).json();
  }

  async getprogressNotesSettingById(req: Request, res: Response) {
    const { progressNotesSettingId } = req.params;
    const props = {
      id: progressNotesSettingId,
      company: req.auth.companyId,
    };

    const progressNotesSetting =
      await progressNotesSettingService.getProgressNotesSettingById(props);

    res.status(200).json(progressNotesSetting);
  }

  async getProgressNotesSettings(req: Request, res: Response) {
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

    const progressNotesSettings =
      await progressNotesSettingService.getProgressNotesSettings(
        props,
        req.auth.userId
      );

    res.status(200).json(progressNotesSettings);
  }
}

export default new ProgressNotesSettingController();
