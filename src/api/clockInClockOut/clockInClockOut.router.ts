import express from "express";

import controller from "./clockInClockOut.controller";
import clockInClockOutSchems from "./clockInClockOut.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "clockInClockOut"),
  clockInClockOutSchems.createClockInClockOut,
  catchWrap(controller.createClockInClockOut)
);

router.put(
  "/:clockInClockOutId",
  canDo("update", "clockInClockOut"),
  clockInClockOutSchems.editClockInClockOut,
  catchWrap(controller.updateClockInClockOut)
);

router.delete(
  "/:clockInClockOutId",
  canDo("delete", "clockInClockOut"),
  clockInClockOutSchems.deleteClockInClockOut,
  catchWrap(controller.deleteClockInClockOut)
);

router.get(
  "/:clockInClockOutId",
  canDo("read", "clockInClockOut"),
  clockInClockOutSchems.getClockInClockOutById,
  catchWrap(controller.getclockInClockOutById)
);

router.get(
  "/",
  canDo("read", "clockInClockOut"),
  clockInClockOutSchems.getClockInClockOuts,
  catchWrap(controller.getClockInClockOuts)
);

export default router;
