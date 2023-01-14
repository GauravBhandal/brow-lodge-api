import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import sendEmail from "../../components/email";
import { alertConfigurationService } from "../alertConfiguration";

import policyService from "./policy.service";

class PolicyController {
  async createPolicy(req: Request, res: Response) {
    const company = req.auth.companyId;
    const props = {
      company,
      ...req.body,
    };

    const policy = await policyService.createPolicy(props);

    // Send Email after creating the entry if alerts are set and emails are present
    alertConfigurationService.getAlertConfigurationByName({ company, name: 'policy' }).then((alertNotificationEmails) => {
      if (alertNotificationEmails.length) {
        const emailBody = `
        Hi user!
        <br>  
        <br>  
        New policy is created recently please check it once!
        <br>
        <br>  
        Best Regards,
        <br>
        Team Care Diary
          `;
        sendEmail(alertNotificationEmails, emailBody, "Policy created successfully!")
      }
    });

    res.status(200).json(policy);
  }

  async updatePolicy(req: Request, res: Response) {
    const { policyId } = req.params;
    const props = {
      id: policyId,
      company: req.auth.companyId,
      ...req.body,
    };

    const policy = await policyService.updatePolicy(props);

    res.status(200).json(policy);
  }

  async deletePolicy(req: Request, res: Response) {
    const { policyId } = req.params;
    const props = {
      id: policyId,
      company: req.auth.companyId,
    };

    await policyService.deletePolicy(props);

    res.status(204).json();
  }

  async getpolicyById(req: Request, res: Response) {
    const { policyId } = req.params;
    const props = {
      id: policyId,
      company: req.auth.companyId,
    };

    const policy = await policyService.getPolicyById(props);

    res.status(200).json(policy);
  }

  async getPolicies(req: Request, res: Response) {
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

    const policies = await policyService.getPolicies(props, req.auth.userId);

    res.status(200).json(policies);
  }
}

export default new PolicyController();
