import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import practiceGuideService from "./practiceGuide.service";

class PracticeGuideController {
  async createPracticeGuide(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const practiceGuide = await practiceGuideService.createPracticeGuide(props);

    res.status(200).json(practiceGuide);
  }

  async updatePracticeGuide(req: Request, res: Response) {
    const { practiceGuideId } = req.params;
    const props = {
      id: practiceGuideId,
      company: req.auth.companyId,
      ...req.body,
    };

    const practiceGuide = await practiceGuideService.updatePracticeGuide(props);

    res.status(200).json(practiceGuide);
  }

  async deletePracticeGuide(req: Request, res: Response) {
    const { practiceGuideId } = req.params;
    const props = {
      id: practiceGuideId,
      company: req.auth.companyId,
    };

    await practiceGuideService.deletePracticeGuide(props);

    res.status(204).json();
  }

  async getpracticeGuideById(req: Request, res: Response) {
    const { practiceGuideId } = req.params;
    const props = {
      id: practiceGuideId,
      company: req.auth.companyId,
    };

    const practiceGuide = await practiceGuideService.getPracticeGuideById(
      props
    );

    res.status(200).json(practiceGuide);
  }

  async getPracticeGuides(req: Request, res: Response) {
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

    const practiceGuides = await practiceGuideService.getPracticeGuides(
      props,
      req.auth.userId
    );

    res.status(200).json(practiceGuides);
  }
}

export default new PracticeGuideController();
