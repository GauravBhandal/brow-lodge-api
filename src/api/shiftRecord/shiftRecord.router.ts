import express from "express";

import controller from "./shiftRecord.controller";
import shiftRecordSchemas from "./shiftRecord.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "shiftRecord"),
  shiftRecordSchemas.createShiftRecord,
  catchWrap(controller.createShiftRecord)
);

router.put(
  "/:shiftRecordId",
  canDo("update", "shiftRecord"),
  shiftRecordSchemas.editShiftRecord,
  catchWrap(controller.updateShiftRecord)
);

router.delete(
  "/:shiftRecordId",
  canDo("delete", "shiftRecord"),
  shiftRecordSchemas.deleteShiftRecord,
  catchWrap(controller.deleteShiftRecord)
);

router.get(
  "/:shiftRecordId",
  canDo("read", "shiftRecord"),
  shiftRecordSchemas.getShiftRecordById,
  catchWrap(controller.getshiftRecordById)
);

router.get(
  "/",
  canDo("read", "shiftRecord"),
  shiftRecordSchemas.getShiftRecords,
  catchWrap(controller.getShiftRecords)
);

export default router;
