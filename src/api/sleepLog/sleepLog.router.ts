import express from "express";

import controller from "./sleepLog.controller";
import sleepLogSchems from "./sleepLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "sleepLog"),
  sleepLogSchems.createSleepLog,
  catchWrap(controller.createSleepLog)
);

router.put(
  "/:sleepLogId",
  canDo("update", "sleepLog"),
  sleepLogSchems.editSleepLog,
  catchWrap(controller.updateSleepLog)
);

router.put(
  "/archive/:sleepLogId",
  canDo("delete", "sleepLog"),
  sleepLogSchems.deleteArchiveSleepLog,
  catchWrap(controller.deleteArchiveSleepLog)
);

router.delete(
  "/:sleepLogId",
  canDo("delete", "sleepLog"),
  sleepLogSchems.deleteSleepLog,
  catchWrap(controller.deleteSleepLog)
);

router.get(
  "/:sleepLogId",
  canDo("read", "sleepLog"),
  sleepLogSchems.getSleepLogById,
  catchWrap(controller.getsleepLogById)
);

router.get(
  "/",
  canDo("read", "sleepLog"),
  sleepLogSchems.getSleepLogs,
  catchWrap(controller.getSleepLogs)
);

export default router;
