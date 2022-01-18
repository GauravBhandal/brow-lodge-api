import express from "express";

import controller from "./bloodPressureLog.controller";
import bloodPressureLogSchems from "./bloodPressureLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  bloodPressureLogSchems.createBloodPressureLog,
  catchWrap(controller.createBloodPressureLog)
);

router.put(
  "/:bloodPressureLogId",
  bloodPressureLogSchems.editBloodPressureLog,
  catchWrap(controller.updateBloodPressureLog)
);

router.delete(
  "/:bloodPressureLogId",
  bloodPressureLogSchems.deleteBloodPressureLog,
  catchWrap(controller.deleteBloodPressureLog)
);

router.get(
  "/:bloodPressureLogId",
  bloodPressureLogSchems.getBloodPressureLogById,
  catchWrap(controller.getbloodPressureLogById)
);

router.get(
  "/",
  bloodPressureLogSchems.getBloodPressureLogs,
  catchWrap(controller.getBloodPressureLogs)
);

export default router;
