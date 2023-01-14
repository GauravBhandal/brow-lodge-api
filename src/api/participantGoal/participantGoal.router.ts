import express from "express";

import controller from "./participantGoal.controller";
import participantGoalSchems from "./participantGoal.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "participantGoal"),
  participantGoalSchems.createParticipantGoal,
  catchWrap(controller.createParticipantGoal)
);

router.put(
  "/:participantGoalId",
  canDo("update", "participantGoal"),
  participantGoalSchems.editParticipantGoal,
  catchWrap(controller.updateParticipantGoal)
);

router.put(
  "/archive/:participantGoalId",
  canDo("delete", "participantGoal"),
  participantGoalSchems.deleteArchiveParticipantGoal,
  catchWrap(controller.deleteArchiveParticipantGoal)
);

router.delete(
  "/:participantGoalId",
  canDo("delete", "participantGoal"),
  participantGoalSchems.deleteParticipantGoal,
  catchWrap(controller.deleteParticipantGoal)
);

router.get(
  "/:participantGoalId",
  canDo("read", "participantGoal"),
  participantGoalSchems.getParticipantGoalById,
  catchWrap(controller.getparticipantGoalById)
);

router.get(
  "/",
  canDo("read", "participantGoal"),
  participantGoalSchems.getParticipantGoals,
  catchWrap(controller.getParticipantGoals)
);

export default router;
