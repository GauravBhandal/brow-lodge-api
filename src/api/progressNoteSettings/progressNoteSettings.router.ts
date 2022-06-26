import express from "express";

import controller from "./progressNoteSettings.controller";
import progressNoteSettingsschemas from "./progressNoteSettings.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.put(
  "/",
  canDo("update", "progressNoteSettings"),
  progressNoteSettingsschemas.editProgressNoteSettings,
  catchWrap(controller.updateProgressNoteSettings)
);

router.get(
  "/",
  // canDo("read", "progressNoteSettings"), // TODO: We have to make it public
  catchWrap(controller.getProgressNoteSettings)
);

export default router;
