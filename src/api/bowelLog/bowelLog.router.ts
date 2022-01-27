import express from "express";

import controller from "./bowelLog.controller";
import bowelLogSchems from "./bowelLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "bowelLog"),
  bowelLogSchems.createBowelLog,
  catchWrap(controller.createBowelLog)
);

router.put(
  "/:bowelLogId",
  canDo("update", "bowelLog"),
  bowelLogSchems.editBowelLog,
  catchWrap(controller.updateBowelLog)
);

router.delete(
  "/:bowelLogId",
  canDo("delete", "bowelLog"),
  bowelLogSchems.deleteBowelLog,
  catchWrap(controller.deleteBowelLog)
);

router.get(
  "/:bowelLogId",
  canDo("read", "bowelLog"),
  bowelLogSchems.getBowelLogById,
  catchWrap(controller.getbowelLogById)
);

router.get(
  "/",
  canDo("read", "bowelLog"),
  bowelLogSchems.getBowelLogs,
  catchWrap(controller.getBowelLogs)
);

export default router;
