import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
import { alertConfigurationService } from "../alertConfiguration";

import processService from "./process.service";

class ProcessController {
  async createProcess(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const process = await processService.createProcess(props);

    // Send Email after creating the entry if alerts are set and emails are present 
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'process' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const contentArray: { label: string, value: string }[] = [
          { label: 'Name', value: process.name },
          { label: 'Version', value: process.version },
        ]
        const url = `/company/processes/${process.id}`
        const emailBody = getTemplateContent('Process Added', 'A new process added with following details!', contentArray, url, 'Process')
        sendEmail(alertNotificationEmails, emailBody, "New process added successfully!")
      }
    });

    res.status(200).json(process);
  }

  async updateProcess(req: Request, res: Response) {
    const { processId } = req.params;
    const props = {
      id: processId,
      company: req.auth.companyId,
      ...req.body,
    };

    const process = await processService.updateProcess(props);

    res.status(200).json(process);
  }

  async deleteProcess(req: Request, res: Response) {
    const { processId } = req.params;
    const props = {
      id: processId,
      company: req.auth.companyId,
    };

    await processService.deleteProcess(props);

    res.status(204).json();
  }

  async deleteArchiveProcess(req: Request, res: Response) {
    const { processId } = req.params;
    const props = {
      id: processId,
      company: req.auth.companyId,
    };

    await processService.deleteArchiveProcess(props);

    res.status(204).json();
  }

  async getprocessById(req: Request, res: Response) {
    const { processId } = req.params;
    const props = {
      id: processId,
      company: req.auth.companyId,
    };

    const process = await processService.getProcessById(props);

    res.status(200).json(process);
  }

  async getProcesses(req: Request, res: Response) {
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

    const processes = await processService.getProcesses(props, req.auth.userId);

    res.status(200).json(processes);
  }
}

export default new ProcessController();
