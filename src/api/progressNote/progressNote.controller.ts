import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import progressNoteService from "./progressNote.service";

class ProgressNoteController {
  async createProgressNote(req: Request, res: Response) {
    const params = _pick(req.body, ["notes"]);

    const progressNote = await progressNoteService.createProgressNote(params);

    res.status(200).json(progressNote);
  }

  async updateProgressNote(req: Request, res: Response) {
    const { progressNoteId } = req.params;
    const params = _pick(req.body, ["notes"]);

    const progressNote = await progressNoteService.updateProgressNote(
      progressNoteId,
      params
    );

    res.status(200).json(progressNote);
  }

  async deleteProgressNote(req: Request, res: Response) {
    const { progressNoteId } = req.params;

    const progressNote = await progressNoteService.deleteProgressNote(
      progressNoteId
    );

    res.status(200).json(progressNote);
  }

  async getprogressNoteById(req: Request, res: Response) {
    const { progressNoteId } = req.params;

    const progressNote = await progressNoteService.getProgressNoteById(
      progressNoteId
    );

    res.status(200).json(progressNote);
  }

  async getProgressNotes(req: Request, res: Response) {
    const queryParams = _pick(req.query, ["page", "pageSize", "sort"]) as any;

    const progressNotes = await progressNoteService.getProgressNotes(
      queryParams
    );

    res.status(200).json(progressNotes);
  }
}

export default new ProgressNoteController();
