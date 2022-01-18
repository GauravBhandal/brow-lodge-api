import express from "express";

import controller from "./bowelLog.controller";
import bowelLogSchems from "./bowelLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  bowelLogSchems.createBowelLog,
  catchWrap(controller.createBowelLog)
);

router.put(
  "/:bowelLogId",
  bowelLogSchems.editBowelLog,
  catchWrap(controller.updateBowelLog)
);

router.delete(
  "/:bowelLogId",
  bowelLogSchems.deleteBowelLog,
  catchWrap(controller.deleteBowelLog)
);

router.get(
  "/:bowelLogId",
  bowelLogSchems.getBowelLogById,
  catchWrap(controller.getbowelLogById)
);

router.get(
  "/",
  bowelLogSchems.getBowelLogs,
  catchWrap(controller.getBowelLogs)
);

export default router;
