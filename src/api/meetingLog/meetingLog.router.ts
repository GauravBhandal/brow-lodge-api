import express from "express";

import controller from "./meetingLog.controller";
import meetingLogSchems from "./meetingLog.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  meetingLogSchems.createMeetingLog,
  catchWrap(controller.createMeetingLog)
);

router.put(
  "/:meetingLogId",
  meetingLogSchems.editMeetingLog,
  catchWrap(controller.updateMeetingLog)
);

router.delete(
  "/:meetingLogId",
  meetingLogSchems.deleteMeetingLog,
  catchWrap(controller.deleteMeetingLog)
);

router.get(
  "/:meetingLogId",
  meetingLogSchems.getMeetingLogById,
  catchWrap(controller.getmeetingLogById)
);

router.get(
  "/",
  meetingLogSchems.getMeetingLogs,
  catchWrap(controller.getMeetingLogs)
);

export default router;
