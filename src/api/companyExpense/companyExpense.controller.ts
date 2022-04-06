import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import companyExpenseService from "./companyExpense.service";

class CompanyExpenseController {
  async createCompanyExpense(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const companyExpense = await companyExpenseService.createCompanyExpense(
      props
    );

    res.status(200).json(companyExpense);
  }

  async updateCompanyExpense(req: Request, res: Response) {
    const { companyExpenseId } = req.params;
    const props = {
      id: companyExpenseId,
      company: req.auth.companyId,
      ...req.body,
    };

    const companyExpense = await companyExpenseService.updateCompanyExpense(
      props
    );

    res.status(200).json(companyExpense);
  }

  async deleteCompanyExpense(req: Request, res: Response) {
    const { companyExpenseId } = req.params;
    const props = {
      id: companyExpenseId,
      company: req.auth.companyId,
    };

    await companyExpenseService.deleteCompanyExpense(props);

    res.status(204).json();
  }

  async getcompanyExpenseById(req: Request, res: Response) {
    const { companyExpenseId } = req.params;
    const props = {
      id: companyExpenseId,
      company: req.auth.companyId,
    };

    const companyExpense = await companyExpenseService.getCompanyExpenseById(
      props
    );

    res.status(200).json(companyExpense);
  }

  async getCompanyExpenses(req: Request, res: Response) {
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

    const companyExpenses = await companyExpenseService.getCompanyExpenses(
      props,
      req.auth.userId
    );

    res.status(200).json(companyExpenses);
  }
}

export default new CompanyExpenseController();
