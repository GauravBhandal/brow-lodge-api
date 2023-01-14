import express from "express";

import controller from "./staffSupervisionLog.controller";
import staffSupervisionLogSchems from "./staffSupervisionLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";
const router = express.Router();

router.post(
  "/",
  canDo("create", "staffSupervisionLog"),
  staffSupervisionLogSchems.createStaffSupervisionLog,
  catchWrap(controller.createStaffSupervisionLog)
);

router.put(
  "/:staffSupervisionLogId",
  canDo("update", "staffSupervisionLog"),
  staffSupervisionLogSchems.editStaffSupervisionLog,
  catchWrap(controller.updateStaffSupervisionLog)
);

router.put(
  "/archive/:staffSupervisionLogId",
  canDo("delete", "staffSupervisionLog"),
  staffSupervisionLogSchems.deleteArchiveStaffSupervisionLog,
  catchWrap(controller.deleteArchiveStaffSupervisionLog)
);

router.delete(
  "/:staffSupervisionLogId",
  canDo("delete", "staffSupervisionLog"),
  staffSupervisionLogSchems.deleteStaffSupervisionLog,
  catchWrap(controller.deleteStaffSupervisionLog)
);

router.get(
  "/:staffSupervisionLogId",
  canDo("read", "staffSupervisionLog"),
  staffSupervisionLogSchems.getStaffSupervisionLogById,
  catchWrap(controller.getstaffSupervisionLogById)
);

router.get(
  "/",
  canDo("read", "staffSupervisionLog"),
  staffSupervisionLogSchems.getStaffSupervisionLogs,
  catchWrap(controller.getStaffSupervisionLogs)
);

export default router;
