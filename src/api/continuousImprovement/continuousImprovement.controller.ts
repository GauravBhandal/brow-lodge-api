import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import continuousImprovementService from "./continuousImprovement.service";

class ContinuousImprovementController {
  async createContinuousImprovement(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const continuousImprovement =
      await continuousImprovementService.createContinuousImprovement(props);

    res.status(200).json(continuousImprovement);
  }

  async updateContinuousImprovement(req: Request, res: Response) {
    const { continuousImprovementId } = req.params;
    const props = {
      id: continuousImprovementId,
      company: req.auth.companyId,
      ...req.body,
    };

    const continuousImprovement =
      await continuousImprovementService.updateContinuousImprovement(props);

    res.status(200).json(continuousImprovement);
  }

  async deleteContinuousImprovement(req: Request, res: Response) {
    const { continuousImprovementId } = req.params;
    const props = {
      id: continuousImprovementId,
      company: req.auth.companyId,
    };

    await continuousImprovementService.deleteContinuousImprovement(props);

    res.status(204).json();
  }

  async deleteArchiveContinuousImprovement(req: Request, res: Response) {
    const { continuousImprovementId } = req.params;
    const props = {
      id: continuousImprovementId,
      company: req.auth.companyId,
    };

    await continuousImprovementService.deleteArchiveContinuousImprovement(
      props
    );

    res.status(204).json();
  }

  async getcontinuousImprovementById(req: Request, res: Response) {
    const { continuousImprovementId } = req.params;
    const props = {
      id: continuousImprovementId,
      company: req.auth.companyId,
    };

    const continuousImprovement =
      await continuousImprovementService.getContinuousImprovementById(props);

    res.status(200).json(continuousImprovement);
  }

  async getContinuousImprovements(req: Request, res: Response) {
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

    const continuousImprovements =
      await continuousImprovementService.getContinuousImprovements(
        props,
        req.auth.userId
      );

    res.status(200).json(continuousImprovements);
  }
}

export default new ContinuousImprovementController();
