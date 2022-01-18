import express from "express";

import controller from "./bloodGlucoseLog.controller";
import bloodGlucoseLogSchems from "./bloodGlucoseLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  bloodGlucoseLogSchems.createBloodGlucoseLog,
  catchWrap(controller.createBloodGlucoseLog)
);

router.put(
  "/:bloodGlucoseLogId",
  bloodGlucoseLogSchems.editBloodGlucoseLog,
  catchWrap(controller.updateBloodGlucoseLog)
);

router.delete(
  "/:bloodGlucoseLogId",
  bloodGlucoseLogSchems.deleteBloodGlucoseLog,
  catchWrap(controller.deleteBloodGlucoseLog)
);

router.get(
  "/:bloodGlucoseLogId",
  bloodGlucoseLogSchems.getBloodGlucoseLogById,
  catchWrap(controller.getbloodGlucoseLogById)
);

router.get(
  "/",
  bloodGlucoseLogSchems.getBloodGlucoseLogs,
  catchWrap(controller.getBloodGlucoseLogs)
);

export default router;
