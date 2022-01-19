import express from "express";

import controller from "./expenseReimbursement.controller";
import expenseReimbursementSchems from "./expenseReimbursement.schema";
import { catchWrap } from "../../components/errors";

const router = express.Router();

router.post(
  "/",
  expenseReimbursementSchems.createExpenseReimbursement,
  catchWrap(controller.createExpenseReimbursement)
);

router.put(
  "/:expenseReimbursementId",
  expenseReimbursementSchems.editExpenseReimbursement,
  catchWrap(controller.updateExpenseReimbursement)
);

router.delete(
  "/:expenseReimbursementId",
  expenseReimbursementSchems.deleteExpenseReimbursement,
  catchWrap(controller.deleteExpenseReimbursement)
);

router.get(
  "/:expenseReimbursementId",
  expenseReimbursementSchems.getExpenseReimbursementById,
  catchWrap(controller.getexpenseReimbursementById)
);

router.get(
  "/",
  expenseReimbursementSchems.getExpenseReimbursements,
  catchWrap(controller.getExpenseReimbursements)
);

export default router;
