import express from "express";

import controller from "./weightLog.controller";
import weightLogSchems from "./weightLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  weightLogSchems.createWeightLog,
  catchWrap(controller.createWeightLog)
);

router.put(
  "/:weightLogId",
  weightLogSchems.editWeightLog,
  catchWrap(controller.updateWeightLog)
);

router.delete(
  "/:weightLogId",
  weightLogSchems.deleteWeightLog,
  catchWrap(controller.deleteWeightLog)
);

router.get(
  "/:weightLogId",
  weightLogSchems.getWeightLogById,
  catchWrap(controller.getweightLogById)
);

router.get(
  "/",
  weightLogSchems.getWeightLogs,
  catchWrap(controller.getWeightLogs)
);

export default router;
