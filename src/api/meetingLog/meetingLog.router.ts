import express from "express";

import controller from "./meetingLog.controller";
import meetingLogSchems from "./meetingLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "meetingLog"),
  meetingLogSchems.createMeetingLog,
  catchWrap(controller.createMeetingLog)
);

router.put(
  "/:meetingLogId",
  canDo("update", "meetingLog"),
  meetingLogSchems.editMeetingLog,
  catchWrap(controller.updateMeetingLog)
);

router.put(
  "/archive/:meetingLogId",
  canDo("delete", "meetingLog"),
  meetingLogSchems.deleteArchiveMeetingLog,
  catchWrap(controller.deleteArchiveMeetingLog)
);

router.delete(
  "/:meetingLogId",
  canDo("delete", "meetingLog"),
  meetingLogSchems.deleteMeetingLog,
  catchWrap(controller.deleteMeetingLog)
);

router.get(
  "/:meetingLogId",
  canDo("read", "meetingLog"),
  meetingLogSchems.getMeetingLogById,
  catchWrap(controller.getmeetingLogById)
);

router.get(
  "/",
  canDo("read", "meetingLog"),
  meetingLogSchems.getMeetingLogs,
  catchWrap(controller.getMeetingLogs)
);

export default router;
