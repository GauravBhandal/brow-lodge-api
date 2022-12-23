import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import regulatoryComplianceService from "./regulatoryCompliance.service";

class RegulatoryComplianceController {
  async createRegulatoryCompliance(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const regulatoryCompliance =
      await regulatoryComplianceService.createRegulatoryCompliance(props);

    res.status(200).json(regulatoryCompliance);
  }

  async updateRegulatoryCompliance(req: Request, res: Response) {
    const { regulatoryComplianceId } = req.params;
    const props = {
      id: regulatoryComplianceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const regulatoryCompliance =
      await regulatoryComplianceService.updateRegulatoryCompliance(props);

    res.status(200).json(regulatoryCompliance);
  }

  async deleteRegulatoryCompliance(req: Request, res: Response) {
    const { regulatoryComplianceId } = req.params;
    const props = {
      id: regulatoryComplianceId,
      company: req.auth.companyId,
    };

    await regulatoryComplianceService.deleteRegulatoryCompliance(props);

    res.status(204).json();
  }
  async deleteArchiveRegulatoryCompliance(req: Request, res: Response) {
    const { regulatoryComplianceId } = req.params;
    const props = {
      id: regulatoryComplianceId,
      company: req.auth.companyId,
    };

    await regulatoryComplianceService.deleteArchiveRegulatoryCompliance(props);

    res.status(204).json();
  }

  async getregulatoryComplianceById(req: Request, res: Response) {
    const { regulatoryComplianceId } = req.params;
    const props = {
      id: regulatoryComplianceId,
      company: req.auth.companyId,
    };

    const regulatoryCompliance =
      await regulatoryComplianceService.getRegulatoryComplianceById(props);

    res.status(200).json(regulatoryCompliance);
  }

  async getRegulatoryCompliances(req: Request, res: Response) {
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

    const regulatoryCompliances =
      await regulatoryComplianceService.getRegulatoryCompliances(
        props,
        req.auth.userId
      );

    res.status(200).json(regulatoryCompliances);
  }
}

export default new RegulatoryComplianceController();
