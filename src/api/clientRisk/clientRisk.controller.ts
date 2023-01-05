import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientRiskService from "./clientRisk.service";

class ClientRiskController {
  async createClientRisk(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clientRisk = await clientRiskService.createClientRisk(props);

    res.status(200).json(clientRisk);
  }

  async updateClientRisk(req: Request, res: Response) {
    const { clientRiskId } = req.params;
    const props = {
      id: clientRiskId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientRisk = await clientRiskService.updateClientRisk(props);

    res.status(200).json(clientRisk);
  }

  async deleteClientRisk(req: Request, res: Response) {
    const { clientRiskId } = req.params;
    const props = {
      id: clientRiskId,
      company: req.auth.companyId,
    };

    await clientRiskService.deleteClientRisk(props);

    res.status(204).json();
  }

  async deleteArchiveClientRisk(req: Request, res: Response) {
    const { clientRiskId } = req.params;
    const props = {
      id: clientRiskId,
      company: req.auth.companyId,
    };

    await clientRiskService.deleteArchiveClientRisk(props);

    res.status(204).json();
  }

  async getclientRiskById(req: Request, res: Response) {
    const { clientRiskId } = req.params;
    const props = {
      id: clientRiskId,
      company: req.auth.companyId,
    };

    const clientRisk = await clientRiskService.getClientRiskById(props);

    res.status(200).json(clientRisk);
  }

  async getClientRisks(req: Request, res: Response) {
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

    const clientRisks = await clientRiskService.getClientRisks(
      props,
      req.auth.userId
    );

    res.status(200).json(clientRisks);
  }
}

export default new ClientRiskController();
