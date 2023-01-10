import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
import { formatDateToString } from "../../utils/shiftGenerator";
import { alertConfigurationService } from "../alertConfiguration";

import feedbackService from "./feedback.service";

class FeedbackController {
  async createFeedback(req: Request, res: Response) {
    const company = req.auth.companyId;
    const props = {
      company,
      ...req.body,
    };

    const feedback = await feedbackService.createFeedback(props);

    // Send Email after creating the entry if alerts are set and emails are present
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'feedback' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const contentArray: { label: string, value: string }[] = [
          { label: 'Date', value: formatDateToString(feedback.dateReported, '', 'DD-MMM-YYYY') },
          {
            label: 'Type of Feedback', value: `${feedback.typeOfFeedback}`
          },
          {
            label: 'You are a?', value: `${feedback.youAreA}`
          },
          {
            label: 'Feedback', value: `${feedback.feedback}`
          },
        ]
        const url = `/reporting/feedbacks/${feedback.id}`
        const emailBody = getTemplateContent('Feedback Received', 'A new feedback received with following details!', contentArray, url)
        sendEmail(alertNotificationEmails, emailBody, "New feedback received!")
      }
    });

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
