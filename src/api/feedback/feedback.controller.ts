import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import feedbackService from "./feedback.service";

class FeedbackController {
  async createFeedback(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const feedback = await feedbackService.createFeedback(props);

    res.status(200).json(feedback);
  }

  async updateFeedback(req: Request, res: Response) {
    const { feedbackId } = req.params;
    const props = {
      id: feedbackId,
      company: req.auth.companyId,
      ...req.body,
    };

    const feedback = await feedbackService.updateFeedback(props);

    res.status(200).json(feedback);
  }

  async deleteArchiveFeedback(req: Request, res: Response) {
    const { feedbackId } = req.params;
    const props = {
      id: feedbackId,
      company: req.auth.companyId,
    };

    await feedbackService.deleteArchiveFeedback(props);

    res.status(204).json();
  }

  async deleteFeedback(req: Request, res: Response) {
    const { feedbackId } = req.params;
    const props = {
      id: feedbackId,
      company: req.auth.companyId,
    };

    await feedbackService.deleteFeedback(props);

    res.status(204).json();
  }

  async getfeedbackById(req: Request, res: Response) {
    const { feedbackId } = req.params;
    const props = {
      id: feedbackId,
      company: req.auth.companyId,
    };

    const feedback = await feedbackService.getFeedbackById(props);

    res.status(200).json(feedback);
  }

  async getFeedbacks(req: Request, res: Response) {
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

    const feedbacks = await feedbackService.getFeedbacks(props);

    res.status(200).json(feedbacks);
  }
}

export default new FeedbackController();
