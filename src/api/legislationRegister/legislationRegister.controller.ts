import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { alertConfigurationService } from "../alertConfiguration";

import legislationRegisterService from "./legislationRegister.service";

class LegislationRegisterController {
  async createLegislationRegister(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const legislationRegister =
      await legislationRegisterService.createLegislationRegister(props);

    // Send Email after creating the entry if alerts are set and emails are present 
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'legislationRegister' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const emailBody = `
            Hi user!
            <br>  
            <br>  
            New legislation register form is created recently please check it once!
            <br>
            <br>  
            Best Regards,
            <br>
            Team Care Diary
              `;
        sendEmail(alertNotificationEmails, emailBody, "Legislation register form created successfully!")
      }
    });

    res.status(200).json(legislationRegister);
  }

  async updateLegislationRegister(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
      ...req.body,
    };

    const legislationRegister =
      await legislationRegisterService.updateLegislationRegister(props);

    res.status(200).json(legislationRegister);
  }

  async deleteLegislationRegister(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
    };

    await legislationRegisterService.deleteLegislationRegister(props);

    res.status(204).json();
  }

  async deleteArchiveLegislationRegister(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
    };

    await legislationRegisterService.deleteArchiveLegislationRegister(props);

    res.status(204).json();
  }

  async getlegislationRegisterById(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
    };

    const legislationRegister =
      await legislationRegisterService.getLegislationRegisterById(props);

    res.status(200).json(legislationRegister);
  }

  async getLegislationRegisters(req: Request, res: Response) {
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

    const legislationRegisters =
      await legislationRegisterService.getLegislationRegisters(props);

    res.status(200).json(legislationRegisters);
  }
}

export default new LegislationRegisterController();
