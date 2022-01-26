import express from "express";

import controller from "./bloodGlucoseLog.controller";
import bloodGlucoseLogSchems from "./bloodGlucoseLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "bloodGlucoseLog"),
  bloodGlucoseLogSchems.createBloodGlucoseLog,
  catchWrap(controller.createBloodGlucoseLog)
);

router.put(
  "/:bloodGlucoseLogId",
  canDo("update", "bloodGlucoseLog"),
  bloodGlucoseLogSchems.editBloodGlucoseLog,
  catchWrap(controller.updateBloodGlucoseLog)
);

router.delete(
  "/:bloodGlucoseLogId",
  canDo("delete", "bloodGlucoseLog"),
  bloodGlucoseLogSchems.deleteBloodGlucoseLog,
  catchWrap(controller.deleteBloodGlucoseLog)
);

router.get(
  "/:bloodGlucoseLogId",
  canDo("read", "bloodGlucoseLog"),
  bloodGlucoseLogSchems.getBloodGlucoseLogById,
  catchWrap(controller.getbloodGlucoseLogById)
);

router.get(
  "/",
  canDo("read", "bloodGlucoseLog"),
  bloodGlucoseLogSchems.getBloodGlucoseLogs,
  catchWrap(controller.getBloodGlucoseLogs)
);

export default router;
