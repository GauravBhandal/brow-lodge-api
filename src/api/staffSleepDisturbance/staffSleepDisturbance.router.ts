import express from "express";

import controller from "./staffSleepDisturbance.controller";
import staffSleepDisturbanceSchems from "./staffSleepDisturbance.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "staffSleepDisturbance"),
  staffSleepDisturbanceSchems.createStaffSleepDisturbance,
  catchWrap(controller.createStaffSleepDisturbance)
);

router.put(
  "/:staffSleepDisturbanceId",
  canDo("update", "staffSleepDisturbance"),
  staffSleepDisturbanceSchems.editStaffSleepDisturbance,
  catchWrap(controller.updateStaffSleepDisturbance)
);

router.put(
  "/archive/:staffSleepDisturbanceId",
  canDo("delete", "staffSleepDisturbance"),
  staffSleepDisturbanceSchems.deleteArchiveStaffSleepDisturbance,
  catchWrap(controller.deleteArchiveStaffSleepDisturbance)
);

router.delete(
  "/:staffSleepDisturbanceId",
  canDo("delete", "staffSleepDisturbance"),
  staffSleepDisturbanceSchems.deleteStaffSleepDisturbance,
  catchWrap(controller.deleteStaffSleepDisturbance)
);

router.get(
  "/:staffSleepDisturbanceId",
  canDo("read", "staffSleepDisturbance"),
  staffSleepDisturbanceSchems.getStaffSleepDisturbanceById,
  catchWrap(controller.getstaffSleepDisturbanceById)
);

router.get(
  "/",
  canDo("read", "staffSleepDisturbance"),
  staffSleepDisturbanceSchems.getStaffSleepDisturbances,
  catchWrap(controller.getStaffSleepDisturbances)
);

export default router;
