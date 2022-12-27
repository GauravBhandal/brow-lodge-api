import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { alertConfigurationService } from "../alertConfiguration";

import feedbackService from "./feedback.service";

class FeedbackController {
  async createFeedback(req: Request, res: Response) {
    const company = req.auth.companyId;
    const props = {
      company,
      ...req.body,
    };

    // const feedback = await feedbackService.createFeedback(props);

    const alertNotificationData: any = await alertConfigurationService.getAlertConfigurationByName({ company, name: 'feedback' });
    if (Object.keys(alertNotificationData || {}).length) {
      const { transport = {} } = alertNotificationData;
      console.log('alertNotificationData', alertNotificationData)
      const emailBody = `
      Hi user!
      <br>  
      <br>  
      New feedback form is created recently please check it once!
      <br>
      <br>  
      Best Regards,
      <br>
      Team Care Diary
        `;
      console.log('transport', transport)
      if (transport.primaryEmail) {
        // sendEmail(transport.primaryEmail, emailBody)
      }
    }
    console.log('alertNotificationData22', alertNotificationData)
    res.status(200).json({});
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
