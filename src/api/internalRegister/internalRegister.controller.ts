import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { alertConfigurationService } from "../alertConfiguration";

import internalRegisterService from "./internalRegister.service";

class InternalRegisterController {
  async createInternalRegister(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const internalRegister =
      await internalRegisterService.createInternalRegister(props);

    // Send Email after creating the entry if alerts are set and emails are present 
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'internalRegister' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const emailBody = `
          Hi user!
          <br>  
          <br>  
          New internal register form is created recently please check it once!
          <br>
          <br>  
          Best Regards,
          <br>
          Team Care Diary
            `;
        sendEmail(alertNotificationEmails, emailBody, "Internal register form created successfully!")
      }
    });

    res.status(200).json(internalRegister);
  }

  async updateInternalRegister(req: Request, res: Response) {
    const { internalRegisterId } = req.params;
    const props = {
      id: internalRegisterId,
      company: req.auth.companyId,
      ...req.body,
    };

    const internalRegister =
      await internalRegisterService.updateInternalRegister(props);

    res.status(200).json(internalRegister);
  }

  async deleteInternalRegister(req: Request, res: Response) {
    const { internalRegisterId } = req.params;
    const props = {
      id: internalRegisterId,
      company: req.auth.companyId,
    };

    await internalRegisterService.deleteInternalRegister(props);

    res.status(204).json();
  }

  async deleteArchiveInternalRegister(req: Request, res: Response) {
    const { internalRegisterId } = req.params;
    const props = {
      id: internalRegisterId,
      company: req.auth.companyId,
    };

    await internalRegisterService.deleteArchiveInternalRegister(props);

    res.status(204).json();
  }

  async getinternalRegisterById(req: Request, res: Response) {
    const { internalRegisterId } = req.params;
    const props = {
      id: internalRegisterId,
      company: req.auth.companyId,
    };

    const internalRegister =
      await internalRegisterService.getInternalRegisterById(props);

    res.status(200).json(internalRegister);
  }

  async getInternalRegisters(req: Request, res: Response) {
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

    const internalRegisters =
      await internalRegisterService.getInternalRegisters(
        props,
        req.auth.userId
      );

    res.status(200).json(internalRegisters);
  }
}

export default new InternalRegisterController();
