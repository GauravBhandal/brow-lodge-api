import express from "express";

import controller from "./leaseAndUtilityLog.controller";
import leaseAndUtilityLogSchems from "./leaseAndUtilityLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  leaseAndUtilityLogSchems.createLeaseAndUtilityLog,
  catchWrap(controller.createLeaseAndUtilityLog)
);

router.put(
  "/:leaseAndUtilityLogId",
  leaseAndUtilityLogSchems.editLeaseAndUtilityLog,
  catchWrap(controller.updateLeaseAndUtilityLog)
);

router.delete(
  "/:leaseAndUtilityLogId",
  leaseAndUtilityLogSchems.deleteLeaseAndUtilityLog,
  catchWrap(controller.deleteLeaseAndUtilityLog)
);

router.get(
  "/:leaseAndUtilityLogId",
  leaseAndUtilityLogSchems.getLeaseAndUtilityLogById,
  catchWrap(controller.getleaseAndUtilityLogById)
);

router.get(
  "/",
  leaseAndUtilityLogSchems.getLeaseAndUtilityLogs,
  catchWrap(controller.getLeaseAndUtilityLogs)
);

export default router;
