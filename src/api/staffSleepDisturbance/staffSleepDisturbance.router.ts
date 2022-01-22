import express from "express";

import controller from "./staffSleepDisturbance.controller";
import staffSleepDisturbanceSchems from "./staffSleepDisturbance.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  staffSleepDisturbanceSchems.createStaffSleepDisturbance,
  catchWrap(controller.createStaffSleepDisturbance)
);

router.put(
  "/:staffSleepDisturbanceId",
  staffSleepDisturbanceSchems.editStaffSleepDisturbance,
  catchWrap(controller.updateStaffSleepDisturbance)
);

router.delete(
  "/:staffSleepDisturbanceId",
  staffSleepDisturbanceSchems.deleteStaffSleepDisturbance,
  catchWrap(controller.deleteStaffSleepDisturbance)
);

router.get(
  "/:staffSleepDisturbanceId",
  staffSleepDisturbanceSchems.getStaffSleepDisturbanceById,
  catchWrap(controller.getstaffSleepDisturbanceById)
);

router.get(
  "/",
  staffSleepDisturbanceSchems.getStaffSleepDisturbances,
  catchWrap(controller.getStaffSleepDisturbances)
);

export default router;
