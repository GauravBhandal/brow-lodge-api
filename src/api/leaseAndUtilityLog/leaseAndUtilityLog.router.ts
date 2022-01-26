import express from "express";

import controller from "./leaseAndUtilityLog.controller";
import leaseAndUtilityLogSchems from "./leaseAndUtilityLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability";
const router = express.Router();

router.post(
  "/",
  canDo("create", "leaseAndUtilityLog"),
  leaseAndUtilityLogSchems.createLeaseAndUtilityLog,
  catchWrap(controller.createLeaseAndUtilityLog)
);

router.put(
  "/:leaseAndUtilityLogId",
  canDo("update", "leaseAndUtilityLog"),
  leaseAndUtilityLogSchems.editLeaseAndUtilityLog,
  catchWrap(controller.updateLeaseAndUtilityLog)
);

router.delete(
  "/:leaseAndUtilityLogId",
  canDo("delete", "leaseAndUtilityLog"),
  leaseAndUtilityLogSchems.deleteLeaseAndUtilityLog,
  catchWrap(controller.deleteLeaseAndUtilityLog)
);

router.get(
  "/:leaseAndUtilityLogId",
  canDo("read", "leaseAndUtilityLog"),
  leaseAndUtilityLogSchems.getLeaseAndUtilityLogById,
  catchWrap(controller.getleaseAndUtilityLogById)
);

router.get(
  "/",
  canDo("read", "leaseAndUtilityLog"),
  leaseAndUtilityLogSchems.getLeaseAndUtilityLogs,
  catchWrap(controller.getLeaseAndUtilityLogs)
);

export default router;
