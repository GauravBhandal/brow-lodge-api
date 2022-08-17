import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import expenseService from "./expense.service";

class ExpenseController {
  async createExpense(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const expense =
      await expenseService.createExpense(props);

    res.status(200).json(expense);
  }

  async updateExpense(req: Request, res: Response) {
    const { expenseId } = req.params;
    const props = {
      id: expenseId,
      company: req.auth.companyId,
      ...req.body,
    };

    const expense =
      await expenseService.updateExpense(props);

    res.status(200).json(expense);
  }

  async deleteExpense(req: Request, res: Response) {
    const { expenseId } = req.params;
    const props = {
      id: expenseId,
      company: req.auth.companyId,
    };

    await expenseService.deleteExpense(props);

    res.status(204).json();
  }

  async getexpenseById(req: Request, res: Response) {
    const { expenseId } = req.params;
    const props = {
      id: expenseId,
      company: req.auth.companyId,
    };

    const expense =
      await expenseService.getExpenseById(props);

    res.status(200).json(expense);
  }

  async getExpenses(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;
    const props = {
      company: req.auth.companyId,
      ...queryParams,
    };

    const expenses =
      await expenseService.getExpenses(props, req.auth.userId);

    res.status(200).json(expenses);
  }
}

export default new ExpenseController();
