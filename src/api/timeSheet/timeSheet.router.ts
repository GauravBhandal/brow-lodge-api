import express from "express";

import controller from "./timeSheet.controller";
import timeSheetSchems from "./timeSheet.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  // canDo("create", "timeSheet"),
  timeSheetSchems.createTimeSheet,
  catchWrap(controller.createTimeSheet)
);

router.put(
  "/:timeSheetId",
  canDo("update", "timeSheet"),
  timeSheetSchems.editTimeSheet,
  catchWrap(controller.updateTimeSheet)
);

router.delete(
  "/:timeSheetId",
  canDo("delete", "timeSheet"),
  timeSheetSchems.deleteTimeSheet,
  catchWrap(controller.deleteTimeSheet)
);

router.get(
  "/:timeSheetId",
  canDo("read", "timeSheet"),
  timeSheetSchems.getTimeSheetById,
  catchWrap(controller.gettimeSheetById)
);

router.get(
  "/",
  canDo("read", "timeSheet"),
  timeSheetSchems.getTimeSheets,
  catchWrap(controller.getTimeSheets)
);

export default router;
