import express from "express";

import controller from "./restrictivePracticeLog.controller";
import restrictivePracticeLogSchems from "./restrictivePracticeLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "restrictivePracticeLog"),
  restrictivePracticeLogSchems.createRestrictivePracticeLog,
  catchWrap(controller.createRestrictivePracticeLog)
);

router.put(
  "/:restrictivePracticeLogId",
  canDo("update", "restrictivePracticeLog"),
  restrictivePracticeLogSchems.editRestrictivePracticeLog,
  catchWrap(controller.updateRestrictivePracticeLog)
);

router.put(
  "/archive/:restrictivePracticeLogId",
  canDo("delete", "restrictivePracticeLog"),
  restrictivePracticeLogSchems.deleteArchiveRestrictivePracticeLog,
  catchWrap(controller.deleteArchiveRestrictivePracticeLog)
);

router.delete(
  "/:restrictivePracticeLogId",
  canDo("delete", "restrictivePracticeLog"),
  restrictivePracticeLogSchems.deleteRestrictivePracticeLog,
  catchWrap(controller.deleteRestrictivePracticeLog)
);

router.get(
  "/:restrictivePracticeLogId",
  canDo("read", "restrictivePracticeLog"),
  restrictivePracticeLogSchems.getRestrictivePracticeLogById,
  catchWrap(controller.getrestrictivePracticeLogById)
);

router.get(
  "/",
  canDo("read", "restrictivePracticeLog"),
  restrictivePracticeLogSchems.getRestrictivePracticeLogs,
  catchWrap(controller.getRestrictivePracticeLogs)
);

export default router;
