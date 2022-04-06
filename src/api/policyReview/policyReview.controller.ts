import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import policyReviewService from "./policyReview.service";

class PolicyReviewController {
  async createPolicyReview(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const policyReview = await policyReviewService.createPolicyReview(props);

    res.status(200).json(policyReview);
  }

  async updatePolicyReview(req: Request, res: Response) {
    const { policyReviewId } = req.params;
    const props = {
      id: policyReviewId,
      company: req.auth.companyId,
      ...req.body,
    };

    const policyReview = await policyReviewService.updatePolicyReview(props);

    res.status(200).json(policyReview);
  }

  async deletePolicyReview(req: Request, res: Response) {
    const { policyReviewId } = req.params;
    const props = {
      id: policyReviewId,
      company: req.auth.companyId,
    };

    await policyReviewService.deletePolicyReview(props);

    res.status(204).json();
  }

  async getpolicyReviewById(req: Request, res: Response) {
    const { policyReviewId } = req.params;
    const props = {
      id: policyReviewId,
      company: req.auth.companyId,
    };

    const policyReview = await policyReviewService.getPolicyReviewById(props);

    res.status(200).json(policyReview);
  }

  async getPolicyReviews(req: Request, res: Response) {
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

    const policyReviews = await policyReviewService.getPolicyReviews(props);

    res.status(200).json(policyReviews);
  }
}

export default new PolicyReviewController();
