import express from "express";

import controller from "./maintenanceLog.controller";
import maintenanceLogSchems from "./maintenanceLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "maintenanceLog"),
  maintenanceLogSchems.createMaintenanceLog,
  catchWrap(controller.createMaintenanceLog)
);

router.put(
  "/:maintenanceLogId",
  canDo("update", "maintenanceLog"),
  maintenanceLogSchems.editMaintenanceLog,
  catchWrap(controller.updateMaintenanceLog)
);

router.delete(
  "/:maintenanceLogId",
  canDo("delete", "maintenanceLog"),
  maintenanceLogSchems.deleteMaintenanceLog,
  catchWrap(controller.deleteMaintenanceLog)
);

router.get(
  "/:maintenanceLogId",
  canDo("read", "maintenanceLog"),
  maintenanceLogSchems.getMaintenanceLogById,
  catchWrap(controller.getmaintenanceLogById)
);

router.get(
  "/",
  canDo("read", "maintenanceLog"),
  maintenanceLogSchems.getMaintenanceLogs,
  catchWrap(controller.getMaintenanceLogs)
);

export default router;
