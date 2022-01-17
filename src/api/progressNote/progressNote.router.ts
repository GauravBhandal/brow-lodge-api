import express from "express";

import controller from "./progressNote.controller";
import progressNoteSchems from "./progressNote.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  progressNoteSchems.createProgressNote,
  catchWrap(controller.createProgressNote)
);

router.put(
  "/:progressNoteId",
  progressNoteSchems.editProgressNote,
  catchWrap(controller.updateProgressNote)
);

router.delete(
  "/:progressNoteId",
  progressNoteSchems.deleteProgressNote,
  catchWrap(controller.deleteProgressNote)
);

router.get(
  "/:progressNoteId",
  progressNoteSchems.getProgressNoteById,
  catchWrap(controller.getprogressNoteById)
);

router.get(
  "/",
  progressNoteSchems.getProgressNotes,
  catchWrap(controller.getProgressNotes)
);

export default router;
