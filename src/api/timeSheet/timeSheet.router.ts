import express from "express";

import controller from "./timeSheet.controller";
import timeSheetSchems from "./timeSheet.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.put(
  "/status",
  canDo("update", "timeSheet"),
  timeSheetSchems.updateTimeSheetStatus,
  catchWrap(controller.updateTimeSheetStatus)
);

router.put(
  "/:timeSheetId",
  canDo("update", "timeSheet"),
  timeSheetSchems.editTimeSheet,
  catchWrap(controller.updateTimeSheet)
);

router.get(
  "/:timeSheetId",
  canDo("read", "timeSheet"),
  timeSheetSchems.getTimeSheetById,
  catchWrap(controller.getTimeSheetById)
);

router.get(
  "/",
  canDo("read", "timeSheet"),
  timeSheetSchems.getTimeSheets,
  catchWrap(controller.getTimeSheets)
);

export default router;
