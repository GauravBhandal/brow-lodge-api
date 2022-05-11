import express from "express";

import controller from "./shiftRecord.controller";
import shiftRecordSchemas from "./shiftRecord.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.get(
  "/myshifts",
  shiftRecordSchemas.getMyShiftRecords,
  catchWrap(controller.getMyShiftRecords)
);

router.post(
  "/",
  canDo("create", "roster"),
  shiftRecordSchemas.createShiftRecord,
  catchWrap(controller.createShiftRecord)
);

router.put(
  "/:shiftRecordId",
  canDo("update", "roster"),
  shiftRecordSchemas.editShiftRecord,
  catchWrap(controller.updateShiftRecord)
);

router.delete(
  "/:shiftRecordId",
  canDo("delete", "roster"),
  shiftRecordSchemas.deleteShiftRecord,
  catchWrap(controller.deleteShiftRecord)
);

router.get(
  "/:shiftRecordId",
  canDo("read", "roster"),
  shiftRecordSchemas.getShiftRecordById,
  catchWrap(controller.getshiftRecordById)
);

router.get(
  "/",
  canDo("read", "roster"),
  shiftRecordSchemas.getShiftRecords,
  catchWrap(controller.getShiftRecords)
);

export default router;
