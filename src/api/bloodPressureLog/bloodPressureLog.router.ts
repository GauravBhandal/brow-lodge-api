import express from "express";

import controller from "./bloodPressureLog.controller";
import bloodPressureLogSchems from "./bloodPressureLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "bloodPressureLog"),
  bloodPressureLogSchems.createBloodPressureLog,
  catchWrap(controller.createBloodPressureLog)
);

router.put(
  "/:bloodPressureLogId",
  canDo("update", "bloodPressureLog"),
  bloodPressureLogSchems.editBloodPressureLog,
  catchWrap(controller.updateBloodPressureLog)
);

router.put(
  "/archive/:bloodPressureLogId",
  canDo("delete", "bloodPressureLog"),
  bloodPressureLogSchems.deleteArchiveBloodPressureLog,
  catchWrap(controller.deleteArchiveBloodPressureLog)
);

router.delete(
  "/:bloodPressureLogId",
  canDo("delete", "bloodPressureLog"),
  bloodPressureLogSchems.deleteBloodPressureLog,
  catchWrap(controller.deleteBloodPressureLog)
);

router.get(
  "/:bloodPressureLogId",
  canDo("read", "bloodPressureLog"),
  bloodPressureLogSchems.getBloodPressureLogById,
  catchWrap(controller.getbloodPressureLogById)
);

router.get(
  "/",
  canDo("read", "bloodPressureLog"),
  bloodPressureLogSchems.getBloodPressureLogs,
  catchWrap(controller.getBloodPressureLogs)
);

export default router;
