import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import conflictOfInterestService from "./conflictOfInterest.service";

class ConflictOfInterestController {
  async createConflictOfInterest(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const conflictOfInterest =
      await conflictOfInterestService.createConflictOfInterest(props);

    res.status(200).json(conflictOfInterest);
  }

  async updateConflictOfInterest(req: Request, res: Response) {
    const { conflictOfInterestId } = req.params;
    const props = {
      id: conflictOfInterestId,
      company: req.auth.companyId,
      ...req.body,
    };

    const conflictOfInterest =
      await conflictOfInterestService.updateConflictOfInterest(props);

    res.status(200).json(conflictOfInterest);
  }

  async deleteConflictOfInterest(req: Request, res: Response) {
    const { conflictOfInterestId } = req.params;
    const props = {
      id: conflictOfInterestId,
      company: req.auth.companyId,
    };

    await conflictOfInterestService.deleteConflictOfInterest(props);

    res.status(204).json();
  }

  async getconflictOfInterestById(req: Request, res: Response) {
    const { conflictOfInterestId } = req.params;
    const props = {
      id: conflictOfInterestId,
      company: req.auth.companyId,
    };

    const conflictOfInterest =
      await conflictOfInterestService.getConflictOfInterestById(props);

    res.status(200).json(conflictOfInterest);
  }

  async getConflictOfInterests(req: Request, res: Response) {
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

    const conflictOfInterests =
      await conflictOfInterestService.getConflictOfInterests(props);

    res.status(200).json(conflictOfInterests);
  }
}

export default new ConflictOfInterestController();
