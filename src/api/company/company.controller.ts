import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import companyService from "./company.service";

class CompanyController {
  async createCompany(req: Request, res: Response) {
    const params = _pick(req.body, ["name"]);

    const company = await companyService.createCompany(params);

    res.status(200).json(company);
  }

  async updateCompany(req: Request, res: Response) {
    const { companyId } = req.params;
    const params = _pick(req.body, ["name"]);

    const company = await companyService.updateCompany(companyId, params);

    res.status(200).json(company);
  }

  async getcompanyById(req: Request, res: Response) {
    const { companyId } = req.params;

    const company = await companyService.getCompanyById(companyId);

    res.status(200).json(company);
  }
}

export default new CompanyController();
