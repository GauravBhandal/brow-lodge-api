import express from "express";

import controller from "./maintenanceLog.controller";
import maintenanceLogSchems from "./maintenanceLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  maintenanceLogSchems.createMaintenanceLog,
  catchWrap(controller.createMaintenanceLog)
);

router.put(
  "/:maintenanceLogId",
  maintenanceLogSchems.editMaintenanceLog,
  catchWrap(controller.updateMaintenanceLog)
);

router.delete(
  "/:maintenanceLogId",
  maintenanceLogSchems.deleteMaintenanceLog,
  catchWrap(controller.deleteMaintenanceLog)
);

router.get(
  "/:maintenanceLogId",
  maintenanceLogSchems.getMaintenanceLogById,
  catchWrap(controller.getmaintenanceLogById)
);

router.get(
  "/",
  maintenanceLogSchems.getMaintenanceLogs,
  catchWrap(controller.getMaintenanceLogs)
);

export default router;
