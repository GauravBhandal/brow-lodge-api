import express from "express";

import controller from "./expense.controller";
import expenseSchems from "./expense.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "expense"),
  expenseSchems.createExpense,
  catchWrap(controller.createExpense)
);

router.put(
  "/:expenseId",
  canDo("update", "expense"),
  expenseSchems.editExpense,
  catchWrap(controller.updateExpense)
);

router.put(
  "/archive/:expenseId",
  canDo("delete", "expense"),
  expenseSchems.deleteArchiveExpense,
  catchWrap(controller.deleteArchiveExpense)
);

router.delete(
  "/:expenseId",
  canDo("delete", "expense"),
  expenseSchems.deleteExpense,
  catchWrap(controller.deleteExpense)
);

router.get(
  "/:expenseId",
  canDo("read", "expense"),
  expenseSchems.getExpenseById,
  catchWrap(controller.getexpenseById)
);

router.get(
  "/",
  canDo("read", "expense"),
  expenseSchems.getExpenses,
  catchWrap(controller.getExpenses)
);

export default router;
