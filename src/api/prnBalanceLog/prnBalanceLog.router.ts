import express from "express";

import controller from "./prnBalanceLog.controller";
import prnBalanceLogSchems from "./prnBalanceLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  prnBalanceLogSchems.createPrnBalanceLog,
  catchWrap(controller.createPrnBalanceLog)
);

router.put(
  "/:prnBalanceLogId",
  prnBalanceLogSchems.editPrnBalanceLog,
  catchWrap(controller.updatePrnBalanceLog)
);

router.delete(
  "/:prnBalanceLogId",
  prnBalanceLogSchems.deletePrnBalanceLog,
  catchWrap(controller.deletePrnBalanceLog)
);

router.get(
  "/:prnBalanceLogId",
  prnBalanceLogSchems.getPrnBalanceLogById,
  catchWrap(controller.getprnBalanceLogById)
);

router.get(
  "/",
  prnBalanceLogSchems.getPrnBalanceLogs,
  catchWrap(controller.getPrnBalanceLogs)
);

export default router;
