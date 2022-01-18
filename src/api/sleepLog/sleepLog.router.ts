import express from "express";

import controller from "./sleepLog.controller";
import sleepLogSchems from "./sleepLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  sleepLogSchems.createSleepLog,
  catchWrap(controller.createSleepLog)
);

router.put(
  "/:sleepLogId",
  sleepLogSchems.editSleepLog,
  catchWrap(controller.updateSleepLog)
);

router.delete(
  "/:sleepLogId",
  sleepLogSchems.deleteSleepLog,
  catchWrap(controller.deleteSleepLog)
);

router.get(
  "/:sleepLogId",
  sleepLogSchems.getSleepLogById,
  catchWrap(controller.getsleepLogById)
);

router.get(
  "/",
  sleepLogSchems.getSleepLogs,
  catchWrap(controller.getSleepLogs)
);

export default router;
