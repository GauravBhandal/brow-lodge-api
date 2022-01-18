import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import progressNoteService from "./progressNote.service";

class ProgressNoteController {
  async createProgressNote(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const progressNote = await progressNoteService.createProgressNote(props);

    res.status(200).json(progressNote);
  }

  async updateProgressNote(req: Request, res: Response) {
    const { progressNoteId } = req.params;
    const props = {
      id: progressNoteId,
      company: req.auth.companyId,
      ...req.body,
    };

    const progressNote = await progressNoteService.updateProgressNote(props);

    res.status(200).json(progressNote);
  }

  async deleteProgressNote(req: Request, res: Response) {
    const { progressNoteId } = req.params;
    const props = {
      id: progressNoteId,
      company: req.auth.companyId,
    };

    await progressNoteService.deleteProgressNote(props);

    res.status(204).json();
  }

  async getprogressNoteById(req: Request, res: Response) {
    const { progressNoteId } = req.params;
    const props = {
      id: progressNoteId,
      company: req.auth.companyId,
    };

    const progressNote = await progressNoteService.getProgressNoteById(props);

    res.status(200).json(progressNote);
  }

  async getProgressNotes(req: Request, res: Response) {
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

    const progressNotes = await progressNoteService.getProgressNotes(props);

    res.status(200).json(progressNotes);
  }
}

export default new ProgressNoteController();
