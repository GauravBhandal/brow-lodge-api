import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import legislationRegisterService from "./legislationRegister.service";

class LegislationRegisterController {
  async createLegislationRegister(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const legislationRegister =
      await legislationRegisterService.createLegislationRegister(props);

    res.status(200).json(legislationRegister);
  }

  async updateLegislationRegister(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
      ...req.body,
    };

    const legislationRegister =
      await legislationRegisterService.updateLegislationRegister(props);

    res.status(200).json(legislationRegister);
  }

  async deleteLegislationRegister(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
    };

    await legislationRegisterService.deleteLegislationRegister(props);

    res.status(204).json();
  }

  async deleteArchiveLegislationRegister(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
    };

    await legislationRegisterService.deleteArchiveLegislationRegister(props);

    res.status(204).json();
  }

  async getlegislationRegisterById(req: Request, res: Response) {
    const { legislationRegisterId } = req.params;
    const props = {
      id: legislationRegisterId,
      company: req.auth.companyId,
    };

    const legislationRegister =
      await legislationRegisterService.getLegislationRegisterById(props);

    res.status(200).json(legislationRegister);
  }

  async getLegislationRegisters(req: Request, res: Response) {
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

    const legislationRegisters =
      await legislationRegisterService.getLegislationRegisters(props);

    res.status(200).json(legislationRegisters);
  }
}

export default new LegislationRegisterController();
