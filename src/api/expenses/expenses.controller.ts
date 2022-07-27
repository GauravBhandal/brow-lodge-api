import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import expensesService from "./expenses.service";

class ExpensesController {
  async createExpenses(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const expenses =
      await expensesService.createExpenses(props);

    res.status(200).json(expenses);
  }

  async updateExpenses(req: Request, res: Response) {
    const { expensesId } = req.params;
    const props = {
      id: expensesId,
      company: req.auth.companyId,
      ...req.body,
    };

    const expenses =
      await expensesService.updateExpenses(props);

    res.status(200).json(expenses);
  }

  async deleteExpenses(req: Request, res: Response) {
    const { expensesId } = req.params;
    const props = {
      id: expensesId,
      company: req.auth.companyId,
    };

    await expensesService.deleteExpenses(props);

    res.status(204).json();
  }

  async getexpensesById(req: Request, res: Response) {
    const { expensesId } = req.params;
    const props = {
      id: expensesId,
      company: req.auth.companyId,
    };

    const expenses =
      await expensesService.getExpensesById(props);

    res.status(200).json(expenses);
  }

  async getExpensess(req: Request, res: Response) {
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

    const expensess =
      await expensesService.getExpensess(props, req.auth.userId);

    res.status(200).json(expensess);
  }
}

export default new ExpensesController();
