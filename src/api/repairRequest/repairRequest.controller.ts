import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { alertConfigurationService } from "../alertConfiguration";

import repairRequestService from "./repairRequest.service";

class RepairRequestController {
  async createRepairRequest(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const repairRequest = await repairRequestService.createRepairRequest(props);

    // Send Email after creating the entry if alerts are set and emails are present 
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'repairRequest' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const emailBody = `
        Hi user!
        <br>  
        <br>  
        New repair request is created recently please check it once!
        <br>
        <br>  
        Best Regards,
        <br>
        Team Care Diary
          `;
        sendEmail(alertNotificationEmails, emailBody, "Repair Request created successfully!")
      }
    });

    res.status(200).json(repairRequest);
  }

  async updateRepairRequest(req: Request, res: Response) {
    const { repairRequestId } = req.params;
    const props = {
      id: repairRequestId,
      company: req.auth.companyId,
      ...req.body,
    };

    const repairRequest = await repairRequestService.updateRepairRequest(props);

    res.status(200).json(repairRequest);
  }

  async deleteRepairRequest(req: Request, res: Response) {
    const { repairRequestId } = req.params;
    const props = {
      id: repairRequestId,
      company: req.auth.companyId,
    };

    await repairRequestService.deleteRepairRequest(props);

    res.status(204).json();
  }

  async deleteArchiveRepairRequest(req: Request, res: Response) {
    const { repairRequestId } = req.params;
    const props = {
      id: repairRequestId,
      company: req.auth.companyId,
    };

    await repairRequestService.deleteArchiveRepairRequest(props);

    res.status(204).json();
  }

  async getrepairRequestById(req: Request, res: Response) {
    const { repairRequestId } = req.params;
    const props = {
      id: repairRequestId,
      company: req.auth.companyId,
    };

    const repairRequest = await repairRequestService.getRepairRequestById(
      props
    );

    res.status(200).json(repairRequest);
  }

  async getRepairRequests(req: Request, res: Response) {
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

    const repairRequests = await repairRequestService.getRepairRequests(props);

    res.status(200).json(repairRequests);
  }
}

export default new RepairRequestController();
