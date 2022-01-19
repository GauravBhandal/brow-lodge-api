import express from "express";

import controller from "./vehicleLog.controller";
import vehicleLogSchems from "./vehicleLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  vehicleLogSchems.createVehicleLog,
  catchWrap(controller.createVehicleLog)
);

router.put(
  "/:vehicleLogId",
  vehicleLogSchems.editVehicleLog,
  catchWrap(controller.updateVehicleLog)
);

router.delete(
  "/:vehicleLogId",
  vehicleLogSchems.deleteVehicleLog,
  catchWrap(controller.deleteVehicleLog)
);

router.get(
  "/:vehicleLogId",
  vehicleLogSchems.getVehicleLogById,
  catchWrap(controller.getvehicleLogById)
);

router.get(
  "/",
  vehicleLogSchems.getVehicleLogs,
  catchWrap(controller.getVehicleLogs)
);

export default router;