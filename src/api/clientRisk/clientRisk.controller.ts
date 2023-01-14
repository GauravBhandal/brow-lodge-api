import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { alertConfigurationService } from "../alertConfiguration";

import clientRiskService from "./clientRisk.service";

class ClientRiskController {
  async createClientRisk(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const clientRisk = await clientRiskService.createClientRisk(props);

    // Send Email after creating the entry if alerts are set and emails are present 
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'participantRiskAssessment' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const emailBody = `
        Hi user!
        <br>  
        <br>  
        New participant risk form is created recently please check it once!
        <br>
        <br>  
        Best Regards,
        <br>
        Team Care Diary
          `;
        sendEmail(alertNotificationEmails, emailBody, "Participant risk created successfully!")
      }
    });

    res.status(200).json(clientRisk);
  }

  async updateClientRisk(req: Request, res: Response) {
    const { clientRiskId } = req.params;
    const props = {
      id: clientRiskId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientRisk = await clientRiskService.updateClientRisk(props);

    res.status(200).json(clientRisk);
  }

  async deleteClientRisk(req: Request, res: Response) {
    const { clientRiskId } = req.params;
    const props = {
      id: clientRiskId,
      company: req.auth.companyId,
    };

    await clientRiskService.deleteClientRisk(props);

    res.status(204).json();
  }

  async getclientRiskById(req: Request, res: Response) {
    const { clientRiskId } = req.params;
    const props = {
      id: clientRiskId,
      company: req.auth.companyId,
    };

    const clientRisk = await clientRiskService.getClientRiskById(props);

    res.status(200).json(clientRisk);
  }

  async getClientRisks(req: Request, res: Response) {
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

    const clientRisks = await clientRiskService.getClientRisks(
      props,
      req.auth.userId
    );

    res.status(200).json(clientRisks);
  }
}

export default new ClientRiskController();
