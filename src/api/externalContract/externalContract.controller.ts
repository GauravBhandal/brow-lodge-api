import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import externalContractService from "./externalContract.service";

class ExternalContractController {
  async createExternalContract(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const externalContract =
      await externalContractService.createExternalContract(props);

    res.status(200).json(externalContract);
  }

  async updateExternalContract(req: Request, res: Response) {
    const { externalContractId } = req.params;
    const props = {
      id: externalContractId,
      company: req.auth.companyId,
      ...req.body,
    };

    const externalContract =
      await externalContractService.updateExternalContract(props);

    res.status(200).json(externalContract);
  }

  async deleteExternalContract(req: Request, res: Response) {
    const { externalContractId } = req.params;
    const props = {
      id: externalContractId,
      company: req.auth.companyId,
    };

    await externalContractService.deleteExternalContract(props);

    res.status(204).json();
  }

  async deleteArchiveExternalContract(req: Request, res: Response) {
    const { externalContractId } = req.params;
    const props = {
      id: externalContractId,
      company: req.auth.companyId,
    };

    await externalContractService.deleteArchiveExternalContract(props);

    res.status(204).json();
  }

  async getexternalContractById(req: Request, res: Response) {
    const { externalContractId } = req.params;
    const props = {
      id: externalContractId,
      company: req.auth.companyId,
    };

    const externalContract =
      await externalContractService.getExternalContractById(props);

    res.status(200).json(externalContract);
  }

  async getExternalContracts(req: Request, res: Response) {
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

    const externalContracts =
      await externalContractService.getExternalContracts(props);

    res.status(200).json(externalContracts);
  }
}

export default new ExternalContractController();
