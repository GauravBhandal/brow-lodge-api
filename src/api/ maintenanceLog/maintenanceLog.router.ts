import express from "express";

import controller from "./ maintenanceLog.controller";
import  maintenanceLogSchems from "./ maintenanceLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
   maintenanceLogSchems.create MaintenanceLog,
  catchWrap(controller.create MaintenanceLog)
);

router.put(
  "/: maintenanceLogId",
   maintenanceLogSchems.edit MaintenanceLog,
  catchWrap(controller.update MaintenanceLog)
);

router.delete(
  "/: maintenanceLogId",
   maintenanceLogSchems.delete MaintenanceLog,
  catchWrap(controller.delete MaintenanceLog)
);

router.get(
  "/: maintenanceLogId",
   maintenanceLogSchems.get MaintenanceLogById,
  catchWrap(controller.get maintenanceLogById)
);

router.get(
  "/",
   maintenanceLogSchems.get MaintenanceLogs,
  catchWrap(controller.get MaintenanceLogs)
);

export default router;
