import express from "express";

import controller from "./weightLog.controller";
import weightLogSchems from "./weightLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "weightLog"),
  weightLogSchems.createWeightLog,
  catchWrap(controller.createWeightLog)
);

router.put(
  "/:weightLogId",
  canDo("update", "weightLog"),
  weightLogSchems.editWeightLog,
  catchWrap(controller.updateWeightLog)
);

router.delete(
  "/:weightLogId",
  canDo("delete", "weightLog"),
  weightLogSchems.deleteWeightLog,
  catchWrap(controller.deleteWeightLog)
);

router.get(
  "/:weightLogId",
  canDo("read", "weightLog"),
  weightLogSchems.getWeightLogById,
  catchWrap(controller.getweightLogById)
);

router.get(
  "/",
  canDo("read", "weightLog"),
  weightLogSchems.getWeightLogs,
  catchWrap(controller.getWeightLogs)
);

export default router;
