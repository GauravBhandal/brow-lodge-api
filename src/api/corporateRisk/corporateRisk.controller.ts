import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { getTemplateContent } from "../../components/email/alertEmailTemplate";
import { formatDateToString } from "../../utils/shiftGenerator";
import { alertConfigurationService } from "../alertConfiguration";

import corporateRiskService from "./corporateRisk.service";

class CorporateRiskController {
  async createCorporateRisk(req: Request, res: Response) {
    const company = req.auth.companyId;
    const props = {
      company,
      ...req.body,
    };

    const corporateRisk = await corporateRiskService.createCorporateRisk(props);

    // Send Email after creating the entry if alerts are set and emails are present
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'corporateRisk' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const contentArray: { label: string, value: string }[] = [
          { label: 'Date', value: formatDateToString(corporateRisk.date, '', 'DD-MMM-YYYY') },
          { label: 'Level Of Risk', value: corporateRisk.levelOfRisk },
          { label: 'Likelihood', value: corporateRisk.likelihood },
          { label: 'Consequences', value: corporateRisk.consequences },
        ]
        const url = `/compliance/corporate-risks/${corporateRisk.id}`
        const emailBody = getTemplateContent('Corporate Risk Reported', 'A new corporate risk received with following details!', contentArray, url, 'Corporate Risk')
        sendEmail(alertNotificationEmails, emailBody, "New corporate risk assessment received!")
      }
    });

    res.status(200).json(corporateRisk);
  }

  async updateCorporateRisk(req: Request, res: Response) {
    const { corporateRiskId } = req.params;
    const props = {
      id: corporateRiskId,
      company: req.auth.companyId,
      ...req.body,
    };

    const corporateRisk = await corporateRiskService.updateCorporateRisk(props);

    res.status(200).json(corporateRisk);
  }

  async deleteCorporateRisk(req: Request, res: Response) {
    const { corporateRiskId } = req.params;
    const props = {
      id: corporateRiskId,
      company: req.auth.companyId,
    };

    await corporateRiskService.deleteCorporateRisk(props);

    res.status(204).json();
  }

  async deleteArchiveCorporateRisk(req: Request, res: Response) {
    const { corporateRiskId } = req.params;
    const props = {
      id: corporateRiskId,
      company: req.auth.companyId,
    };

    await corporateRiskService.deleteArchiveCorporateRisk(props);

    res.status(204).json();
  }

  async getcorporateRiskById(req: Request, res: Response) {
    const { corporateRiskId } = req.params;
    const props = {
      id: corporateRiskId,
      company: req.auth.companyId,
    };

    const corporateRisk = await corporateRiskService.getCorporateRiskById(
      props
    );

    res.status(200).json(corporateRisk);
  }

  async getCorporateRisks(req: Request, res: Response) {
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

    const corporateRisks = await corporateRiskService.getCorporateRisks(props);

    res.status(200).json(corporateRisks);
  }
}

export default new CorporateRiskController();
