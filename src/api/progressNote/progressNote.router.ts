import express from "express";

import controller from "./progressNote.controller";
import progressNoteSchems from "./progressNote.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "progressNote"),
  progressNoteSchems.createProgressNote,
  catchWrap(controller.createProgressNote)
);

router.put(
  "/:progressNoteId",
  canDo("update", "progressNote"),
  progressNoteSchems.editProgressNote,
  catchWrap(controller.updateProgressNote)
);

router.delete(
  "/:progressNoteId",
  canDo("delete", "progressNote"),
  progressNoteSchems.deleteProgressNote,
  catchWrap(controller.deleteProgressNote)
);

router.get(
  "/:progressNoteId",
  canDo("read", "progressNote"),
  progressNoteSchems.getProgressNoteById,
  catchWrap(controller.getprogressNoteById)
);

router.get(
  "/",
  canDo("read", "progressNote"),
  progressNoteSchems.getProgressNotes,
  catchWrap(controller.getProgressNotes)
);

export default router;
