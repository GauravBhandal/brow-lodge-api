import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import participantExpenseService from "./participantExpense.service";

class ParticipantExpenseController {
  async createParticipantExpense(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const participantExpense = await participantExpenseService.createParticipantExpense(props);

    res.status(200).json(participantExpense);
  }

  async updateParticipantExpense(req: Request, res: Response) {
    const { participantExpenseId } = req.params;
    const props = {
      id: participantExpenseId,
      company: req.auth.companyId,
      ...req.body,
    };

    const participantExpense = await participantExpenseService.updateParticipantExpense(props);

    res.status(200).json(participantExpense);
  }

  async deleteParticipantExpense(req: Request, res: Response) {
    const { participantExpenseId } = req.params;
    const props = {
      id: participantExpenseId,
      company: req.auth.companyId,
    };

    await participantExpenseService.deleteParticipantExpense(props);

    res.status(204).json();
  }

  async getparticipantExpenseById(req: Request, res: Response) {
    const { participantExpenseId } = req.params;
    const props = {
      id: participantExpenseId,
      company: req.auth.companyId,
    };

    const participantExpense = await participantExpenseService.getParticipantExpenseById(props);

    res.status(200).json(participantExpense);
  }

  async getParticipantExpenses(req: Request, res: Response) {
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

    const participantExpenses = await participantExpenseService.getParticipantExpenses(
      props,
      req.auth.userId
    );

    res.status(200).json(participantExpenses);
  }
}

export default new ParticipantExpenseController();
