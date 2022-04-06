import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import policyService from "./policy.service";

class PolicyController {
  async createPolicy(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const policy = await policyService.createPolicy(props);

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
