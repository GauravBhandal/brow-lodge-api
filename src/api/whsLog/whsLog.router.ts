import express from "express";

import controller from "./whsLog.controller";
import whsLogSchems from "./whsLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "whsLog"),
  whsLogSchems.createWhsLog,
  catchWrap(controller.createWhsLog)
);

router.put(
  "/:whsLogId",
  canDo("update", "whsLog"),
  whsLogSchems.editWhsLog,
  catchWrap(controller.updateWhsLog)
);

router.put(
  "/archive/:whsLogId",
  canDo("delete", "whsLog"),
  whsLogSchems.deleteArchiveWhsLog,
  catchWrap(controller.deleteArchiveWhsLog)
);

router.delete(
  "/:whsLogId",
  canDo("delete", "whsLog"),
  whsLogSchems.deleteWhsLog,
  catchWrap(controller.deleteWhsLog)
);

router.get(
  "/:whsLogId",
  canDo("read", "whsLog"),
  whsLogSchems.getWhsLogById,
  catchWrap(controller.getwhsLogById)
);

router.get(
  "/",
  canDo("read", "whsLog"),
  whsLogSchems.getWhsLogs,
  catchWrap(controller.getWhsLogs)
);

export default router;
