import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import keyDecisionService from "./keyDecision.service";

class KeyDecisionController {
  async createKeyDecision(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const keyDecision = await keyDecisionService.createKeyDecision(props);

    res.status(200).json(keyDecision);
  }

  async updateKeyDecision(req: Request, res: Response) {
    const { keyDecisionId } = req.params;
    const props = {
      id: keyDecisionId,
      company: req.auth.companyId,
      ...req.body,
    };

    const keyDecision = await keyDecisionService.updateKeyDecision(props);

    res.status(200).json(keyDecision);
  }

  async deleteKeyDecision(req: Request, res: Response) {
    const { keyDecisionId } = req.params;
    const props = {
      id: keyDecisionId,
      company: req.auth.companyId,
    };

    await keyDecisionService.deleteKeyDecision(props);

    res.status(204).json();
  }

  async getkeyDecisionById(req: Request, res: Response) {
    const { keyDecisionId } = req.params;
    const props = {
      id: keyDecisionId,
      company: req.auth.companyId,
    };

    const keyDecision = await keyDecisionService.getKeyDecisionById(props);

    res.status(200).json(keyDecision);
  }

  async getKeyDecisions(req: Request, res: Response) {
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

    const keyDecisions = await keyDecisionService.getKeyDecisions(props);

    res.status(200).json(keyDecisions);
  }
}

export default new KeyDecisionController();
