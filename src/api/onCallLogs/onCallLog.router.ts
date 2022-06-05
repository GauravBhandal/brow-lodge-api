import express from "express";

import controller from "./onCallLog.controller";
import onCallLogSchems from "./onCallLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";
const router = express.Router();

router.post(
  "/",
  canDo("create", "onCallLog"),
  onCallLogSchems.createOnCallLog,
  catchWrap(controller.createOnCallLog)
);

router.put(
  "/:onCallLogId",
  canDo("update", "onCallLog"),
  onCallLogSchems.editOnCallLog,
  catchWrap(controller.updateOnCallLog)
);

router.delete(
  "/:onCallLogId",
  canDo("delete", "onCallLog"),
  onCallLogSchems.deleteOnCallLog,
  catchWrap(controller.deleteOnCallLog)
);

router.get(
  "/:onCallLogId",
  canDo("read", "onCallLog"),
  onCallLogSchems.getOnCallLogById,
  catchWrap(controller.getonCallLogById)
);

router.get(
  "/",
  canDo("read", "onCallLog"),
  onCallLogSchems.getOnCallLogs,
  catchWrap(controller.getOnCallLogs)
);

export default router;
