import express from "express";

import controller from "./companyExpense.controller";
import companyExpenseSchems from "./companyExpense.schema";
import { catchWrap } from "../../components/errors";
import { canDo } from "../../components/ability/canDo";
const router = express.Router();

router.post(
  "/",
  canDo("create", "companyExpense"),
  companyExpenseSchems.createCompanyExpense,
  catchWrap(controller.createCompanyExpense)
);

router.put(
  "/:companyExpenseId",
  canDo("update", "companyExpense"),
  companyExpenseSchems.editCompanyExpense,
  catchWrap(controller.updateCompanyExpense)
);

router.delete(
  "/:companyExpenseId",
  canDo("delete", "companyExpense"),
  companyExpenseSchems.deleteCompanyExpense,
  catchWrap(controller.deleteCompanyExpense)
);

router.get(
  "/:companyExpenseId",
  canDo("read", "companyExpense"),
  companyExpenseSchems.getCompanyExpenseById,
  catchWrap(controller.getcompanyExpenseById)
);

router.get(
  "/",
  canDo("read", "companyExpense"),
  companyExpenseSchems.getCompanyExpenses,
  catchWrap(controller.getCompanyExpenses)
);

export default router;
