import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import expenseReimbursementService from "./expenseReimbursement.service";

class ExpenseReimbursementController {
  async createExpenseReimbursement(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const expenseReimbursement =
      await expenseReimbursementService.createExpenseReimbursement(props);

    res.status(200).json(expenseReimbursement);
  }

  async updateExpenseReimbursement(req: Request, res: Response) {
    const { expenseReimbursementId } = req.params;
    const props = {
      id: expenseReimbursementId,
      company: req.auth.companyId,
      ...req.body,
    };

    const expenseReimbursement =
      await expenseReimbursementService.updateExpenseReimbursement(props);

    res.status(200).json(expenseReimbursement);
  }

  async deleteExpenseReimbursement(req: Request, res: Response) {
    const { expenseReimbursementId } = req.params;
    const props = {
      id: expenseReimbursementId,
      company: req.auth.companyId,
    };

    await expenseReimbursementService.deleteExpenseReimbursement(props);

    res.status(204).json();
  }

  async getexpenseReimbursementById(req: Request, res: Response) {
    const { expenseReimbursementId } = req.params;
    const props = {
      id: expenseReimbursementId,
      company: req.auth.companyId,
    };

    const expenseReimbursement =
      await expenseReimbursementService.getExpenseReimbursementById(props);

    res.status(200).json(expenseReimbursement);
  }

  async getExpenseReimbursements(req: Request, res: Response) {
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

    const expenseReimbursements =
      await expenseReimbursementService.getExpenseReimbursements(props);

    res.status(200).json(expenseReimbursements);
  }
}

export default new ExpenseReimbursementController();
