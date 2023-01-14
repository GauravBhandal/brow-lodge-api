import express from "express";

import controller from "./prnBalanceLog.controller";
import prnBalanceLogSchems from "./prnBalanceLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "prnBalanceLog"),
  prnBalanceLogSchems.createPrnBalanceLog,
  catchWrap(controller.createPrnBalanceLog)
);

router.put(
  "/:prnBalanceLogId",
  canDo("update", "prnBalanceLog"),
  prnBalanceLogSchems.editPrnBalanceLog,
  catchWrap(controller.updatePrnBalanceLog)
);

router.put(
  "/archive/:prnBalanceLogId",
  canDo("delete", "prnBalanceLog"),
  prnBalanceLogSchems.deleteArchivePrnBalanceLog,
  catchWrap(controller.deleteArchivePrnBalanceLog)
);

router.delete(
  "/:prnBalanceLogId",
  canDo("delete", "prnBalanceLog"),
  prnBalanceLogSchems.deletePrnBalanceLog,
  catchWrap(controller.deletePrnBalanceLog)
);

router.get(
  "/:prnBalanceLogId",
  canDo("read", "prnBalanceLog"),
  prnBalanceLogSchems.getPrnBalanceLogById,
  catchWrap(controller.getprnBalanceLogById)
);

router.get(
  "/",
  canDo("read", "prnBalanceLog"),
  prnBalanceLogSchems.getPrnBalanceLogs,
  catchWrap(controller.getPrnBalanceLogs)
);

export default router;
