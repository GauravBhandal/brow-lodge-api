import express from "express";

import controller from "./expenseReimbursement.controller";
import expenseReimbursementSchems from "./expenseReimbursement.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "expenseReimbursement"),
  expenseReimbursementSchems.createExpenseReimbursement,
  catchWrap(controller.createExpenseReimbursement)
);

router.put(
  "/:expenseReimbursementId",
  canDo("update", "expenseReimbursement"),
  expenseReimbursementSchems.editExpenseReimbursement,
  catchWrap(controller.updateExpenseReimbursement)
);

router.delete(
  "/:expenseReimbursementId",
  canDo("delete", "expenseReimbursement"),
  expenseReimbursementSchems.deleteExpenseReimbursement,
  catchWrap(controller.deleteExpenseReimbursement)
);

router.get(
  "/:expenseReimbursementId",
  canDo("read", "expenseReimbursement"),
  expenseReimbursementSchems.getExpenseReimbursementById,
  catchWrap(controller.getexpenseReimbursementById)
);

router.get(
  "/",
  canDo("read", "expenseReimbursement"),
  expenseReimbursementSchems.getExpenseReimbursements,
  catchWrap(controller.getExpenseReimbursements)
);

export default router;
