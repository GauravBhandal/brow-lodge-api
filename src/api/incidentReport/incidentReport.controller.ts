import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
import { formatDateToString, getFormattedTime } from "../../utils/shiftGenerator";
import { alertConfigurationService } from "../alertConfiguration";

import incidentReportService from "./incidentReport.service";

class IncidentReportController {
  async createIncidentReport(req: Request, res: Response) {
    const company = req.auth.companyId
    const props = {
      company,
      ...req.body,
    };

    const incidentReport = await incidentReportService.createIncidentReport(
      props
    );

    // Send Email after creating the entry if alerts are set and emails are present
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'incidentReport' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const contentArray: { label: string, value: string }[] = [
          { label: 'Date', value: formatDateToString(incidentReport.date, '', 'DD-MMM-YYYY') },
          { label: 'Time', value: `${getFormattedTime(incidentReport.time)}` },
          { label: 'Location', value: incidentReport.location },
          { label: 'Description', value: incidentReport.incidentDescription },
        ]
        const url = `/reporting/incidents/${incidentReport.id}`
        const emailBody = getTemplateContent('Incident Reported', 'A new incident report received with following details!', contentArray, url, 'Incident Report')
        sendEmail(alertNotificationEmails, emailBody, "New incident report received!")
      }
    });

    res.status(200).json(incidentReport);
  }

  async updateIncidentReport(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
      ...req.body,
    };

    const incidentReport = await incidentReportService.updateIncidentReport(
      props
    );

    res.status(200).json(incidentReport);
  }

  async deleteIncidentReport(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
    };

    await incidentReportService.deleteIncidentReport(props);

    res.status(204).json();
  }

  async deleteArchiveIncidentReport(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
    };

    await incidentReportService.deleteArchiveIncidentReport(props);

    res.status(204).json();
  }

  async getincidentReportById(req: Request, res: Response) {
    const { incidentReportId } = req.params;
    const props = {
      id: incidentReportId,
      company: req.auth.companyId,
    };

    const incidentReport = await incidentReportService.getIncidentReportById(
      props
    );

    res.status(200).json(incidentReport);
  }

  async getIncidentReports(req: Request, res: Response) {
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

    const incidentReports = await incidentReportService.getIncidentReports(
      props,
      req.auth.userId
    );

    res.status(200).json(incidentReports);
  }
}

export default new IncidentReportController();
