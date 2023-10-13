import express from "express";

import controller from "./shiftRecord.controller";
import shiftRecordSchems from "./shiftRecord.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "shiftRecord"),
  shiftRecordSchems.createAllShiftRecord,
  catchWrap(controller.createShiftRecord)
);

router.put(
  "/:shiftRecordId",
  canDo("update", "shiftRecord"),
  shiftRecordSchems.editShiftRecord,
  catchWrap(controller.updateShiftRecord)
);

router.delete(
  "/:shiftRecordId",
  canDo("delete", "shiftRecord"),
  shiftRecordSchems.deleteShiftRecord,
  catchWrap(controller.deleteShiftRecord)
);

router.get(
  "/:shiftRecordId",
  canDo("read", "shiftRecord"),
  shiftRecordSchems.getShiftRecordById,
  catchWrap(controller.getshiftRecordById)
);

router.get(
  "/",
  canDo("read", "shiftRecord"),
  shiftRecordSchems.getShiftRecords,
  catchWrap(controller.getShiftRecords)
);

export default router;
