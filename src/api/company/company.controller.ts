import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import companyService from "./company.service";

class CompanyController {
  async updateCompany(req: Request, res: Response) {
    const { companyId } = req.params;
    const bodyParams = _pick(req.body, ["name"]);
    const props = {
      id: companyId,
      company: req.auth.companyId,
      ...bodyParams,
    };

    const company = await companyService.updateCompany(props);
    res.status(200).json(company);
  }

  async getcompanyById(req: Request, res: Response) {
    const { companyId } = req.params;
    const props = {
      id: companyId,
      company: req.auth.companyId,
    };

    const company = await companyService.getCompanyById(props);
    res.status(200).json(company);
  }
}

export default new CompanyController();
