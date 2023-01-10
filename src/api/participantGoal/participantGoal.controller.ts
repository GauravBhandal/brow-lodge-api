import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
import { formatDateToString } from "../../utils/shiftGenerator";
import { alertConfigurationService } from "../alertConfiguration";

import participantGoalService from "./participantGoal.service";

class ParticipantGoalController {
  async createParticipantGoal(req: Request, res: Response) {
    const company = req.auth.companyId;
    const props = {
      company,
      ...req.body,
    };

    const participantGoal = await participantGoalService.createParticipantGoal(
      props
    );

    // Send Email after creating the entry if alerts are set and emails are present 
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'participantGoal' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const contentArray: { label: string, value: string }[] = [
          { label: 'Goal Title', value: participantGoal.title },
          { label: 'Type', value: participantGoal.type },
          { label: 'Start Date', value: formatDateToString(participantGoal.startDate, '', 'DD-MMM-YYYY') },
          { label: 'Status', value: participantGoal.status },
        ]
        const url = `/participant/goals/${participantGoal.id}`
        const emailBody = getTemplateContent('Participant Goal Received', 'A new participant goal received with following details!', contentArray, url)
        sendEmail(alertNotificationEmails, emailBody, "New participant goal received!")
      }
    });

    res.status(200).json(participantGoal);
  }

  async updateParticipantGoal(req: Request, res: Response) {
    const { participantGoalId } = req.params;
    const props = {
      id: participantGoalId,
      company: req.auth.companyId,
      ...req.body,
    };

    const participantGoal = await participantGoalService.updateParticipantGoal(
      props
    );

    res.status(200).json(participantGoal);
  }

  async deleteParticipantGoal(req: Request, res: Response) {
    const { participantGoalId } = req.params;
    const props = {
      id: participantGoalId,
      company: req.auth.companyId,
    };

    await participantGoalService.deleteParticipantGoal(props);

    res.status(204).json();
  }

  async getparticipantGoalById(req: Request, res: Response) {
    const { participantGoalId } = req.params;
    const props = {
      id: participantGoalId,
      company: req.auth.companyId,
    };

    const participantGoal = await participantGoalService.getParticipantGoalById(
      props
    );

    res.status(200).json(participantGoal);
  }

  async getParticipantGoals(req: Request, res: Response) {
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

    const participantGoals = await participantGoalService.getParticipantGoals(
      props,
      req.auth.userId
    );

    res.status(200).json(participantGoals);
  }
}

export default new ParticipantGoalController();
