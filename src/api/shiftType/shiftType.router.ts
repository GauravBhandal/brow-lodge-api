import express from "express";

import controller from "./shiftType.controller";
import shiftTypeSchemas from "./shiftType.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "shiftType"),
  shiftTypeSchemas.createShiftType,
  catchWrap(controller.createShiftType)
);

router.put(
  "/:shiftTypeId",
  canDo("update", "shiftType"),
  shiftTypeSchemas.editShiftType,
  catchWrap(controller.updateShiftType)
);

router.delete(
  "/:shiftTypeId",
  canDo("delete", "shiftType"),
  shiftTypeSchemas.deleteShiftType,
  catchWrap(controller.deleteShiftType)
);

router.get(
  "/:shiftTypeId",
  canDo("read", "shiftType"),
  shiftTypeSchemas.getShiftTypeById,
  catchWrap(controller.getshiftTypeById)
);

router.get(
  "/",
  canDo("read", "shiftType"),
  shiftTypeSchemas.getShiftTypes,
  catchWrap(controller.getShiftTypes)
);

export default router;
