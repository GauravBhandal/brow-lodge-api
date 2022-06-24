import express from "express";

import controller from "./progressNotesSetting.controller";
import progressNotesSettingSchems from "./progressNotesSetting.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "progressNotesSetting"),
  progressNotesSettingSchems.createProgressNotesSetting,
  catchWrap(controller.createProgressNotesSetting)
);

router.put(
  "/:progressNotesSettingId",
  canDo("update", "progressNotesSetting"),
  progressNotesSettingSchems.editProgressNotesSetting,
  catchWrap(controller.updateProgressNotesSetting)
);

router.delete(
  "/:progressNotesSettingId",
  canDo("delete", "progressNotesSetting"),
  progressNotesSettingSchems.deleteProgressNotesSetting,
  catchWrap(controller.deleteProgressNotesSetting)
);

router.get(
  "/:progressNotesSettingId",
  canDo("read", "progressNotesSetting"),
  progressNotesSettingSchems.getProgressNotesSettingById,
  catchWrap(controller.getprogressNotesSettingById)
);

router.get(
  "/",
  canDo("read", "progressNotesSetting"),
  progressNotesSettingSchems.getProgressNotesSettings,
  catchWrap(controller.getProgressNotesSettings)
);

export default router;
