import express from "express";

import controller from "./participantCommunicationLog.controller";
import participantCommunicationLogSchems from "./participantCommunicationLog.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";
const router = express.Router();

router.post(
  "/",
  canDo("create", "participantCommunicationLog"),
  participantCommunicationLogSchems.createParticipantCommunicationLog,
  catchWrap(controller.createParticipantCommunicationLog)
);

router.put(
  "/:participantCommunicationLogId",
  canDo("update", "participantCommunicationLog"),
  participantCommunicationLogSchems.editParticipantCommunicationLog,
  catchWrap(controller.updateParticipantCommunicationLog)
);

router.delete(
  "/:participantCommunicationLogId",
  canDo("delete", "participantCommunicationLog"),
  participantCommunicationLogSchems.deleteParticipantCommunicationLog,
  catchWrap(controller.deleteParticipantCommunicationLog)
);

router.get(
  "/:participantCommunicationLogId",
  canDo("read", "participantCommunicationLog"),
  participantCommunicationLogSchems.getParticipantCommunicationLogById,
  catchWrap(controller.getparticipantCommunicationLogById)
);

router.get(
  "/",
  canDo("read", "participantCommunicationLog"),
  participantCommunicationLogSchems.getParticipantCommunicationLogs,
  catchWrap(controller.getParticipantCommunicationLogs)
);

export default router;
