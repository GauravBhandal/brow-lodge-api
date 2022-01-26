import express from "express";

import controller from "./vehicleLog.controller";
import vehicleLogSchems from "./vehicleLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";

const router = express.Router();

router.post(
  "/",
  canDo("create", "vehicleLog"),
  vehicleLogSchems.createVehicleLog,
  catchWrap(controller.createVehicleLog)
);

router.put(
  "/:vehicleLogId",
  canDo("update", "vehicleLog"),
  vehicleLogSchems.editVehicleLog,
  catchWrap(controller.updateVehicleLog)
);

router.delete(
  "/:vehicleLogId",
  canDo("delete", "vehicleLog"),
  vehicleLogSchems.deleteVehicleLog,
  catchWrap(controller.deleteVehicleLog)
);

router.get(
  "/:vehicleLogId",
  canDo("read", "vehicleLog"),
  vehicleLogSchems.getVehicleLogById,
  catchWrap(controller.getvehicleLogById)
);

router.get(
  "/",
  canDo("read", "vehicleLog"),
  vehicleLogSchems.getVehicleLogs,
  catchWrap(controller.getVehicleLogs)
);

export default router;
