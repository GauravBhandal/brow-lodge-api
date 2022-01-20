import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import corporateRiskService from "./corporateRisk.service";

class CorporateRiskController {
  async createCorporateRisk(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const corporateRisk = await corporateRiskService.createCorporateRisk(props);

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