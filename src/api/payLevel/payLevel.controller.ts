import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import payLevelService from "./payLevel.service";

class PayLevelController {
  async createPayLevel(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const payLevel = await payLevelService.createPayLevel(props);

    res.status(200).json(payLevel);
  }

  async updatePayLevel(req: Request, res: Response) {
    const { payLevelId } = req.params;
    const props = {
      id: payLevelId,
      company: req.auth.companyId,
      ...req.body,
    };

    const payLevel = await payLevelService.updatePayLevel(props);

    res.status(200).json(payLevel);
  }

  async deletePayLevel(req: Request, res: Response) {
    const { payLevelId } = req.params;
    const props = {
      id: payLevelId,
      company: req.auth.companyId,
    };

    await payLevelService.deletePayLevel(props);

    res.status(204).json();
  }

  async getpayLevelById(req: Request, res: Response) {
    const { payLevelId } = req.params;
    const props = {
      id: payLevelId,
      company: req.auth.companyId,
    };

    const payLevel = await payLevelService.getPayLevelById(props);

    res.status(200).json(payLevel);
  }

  async getPayLevels(req: Request, res: Response) {
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

    const payLevels = await payLevelService.getPayLevels(props);

    res.status(200).json(payLevels);
  }
}

export default new PayLevelController();
