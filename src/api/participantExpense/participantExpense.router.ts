import express from "express";

import controller from "./participantExpense.controller";
import participantExpenseSchems from "./participantExpense.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "participantExpense"),
  participantExpenseSchems.createParticipantExpense,
  catchWrap(controller.createParticipantExpense)
);

router.put(
  "/:participantExpenseId",
  canDo("update", "participantExpense"),
  participantExpenseSchems.editParticipantExpense,
  catchWrap(controller.updateParticipantExpense)
);

router.delete(
  "/:participantExpenseId",
  canDo("delete", "participantExpense"),
  participantExpenseSchems.deleteParticipantExpense,
  catchWrap(controller.deleteParticipantExpense)
);

router.get(
  "/:participantExpenseId",
  canDo("read", "participantExpense"),
  participantExpenseSchems.getParticipantExpenseById,
  catchWrap(controller.getparticipantExpenseById)
);

router.get(
  "/",
  canDo("read", "participantExpense"),
  participantExpenseSchems.getParticipantExpenses,
  catchWrap(controller.getParticipantExpenses)
);

export default router;
