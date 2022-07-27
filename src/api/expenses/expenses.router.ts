import express from "express";

import controller from "./expenses.controller";
import expensesSchems from "./expenses.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";

const router = express.Router();

router.post(
  "/",
  canDo("create", "expenses"),
  expensesSchems.createExpenses,
  catchWrap(controller.createExpenses)
);

router.put(
  "/:expensesId",
  canDo("update", "expenses"),
  expensesSchems.editExpenses,
  catchWrap(controller.updateExpenses)
);

router.delete(
  "/:expensesId",
  canDo("delete", "expenses"),
  expensesSchems.deleteExpenses,
  catchWrap(controller.deleteExpenses)
);

router.get(
  "/:expensesId",
  canDo("read", "expenses"),
  expensesSchems.getExpensesById,
  catchWrap(controller.getexpensesById)
);

router.get(
  "/",
  canDo("read", "expenses"),
  expensesSchems.getExpensess,
  catchWrap(controller.getExpensess)
);

export default router;
