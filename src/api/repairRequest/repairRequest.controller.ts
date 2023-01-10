import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
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
        const contentArray: { label: string, value: string }[] = [
          { label: 'Problem', value: repairRequest.problem },
          { label: 'Location', value: repairRequest.location },
          { label: 'Priority', value: repairRequest.priority },
        ]
        const url = `/asset/repair-requests/${repairRequest.id}`
        const emailBody = getTemplateContent('Repair Request Added', 'A repair request added with following details!', contentArray, url, 'Repair Request')
        sendEmail(alertNotificationEmails, emailBody, "New repair request created successfully!")
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
