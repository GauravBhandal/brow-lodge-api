import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import waxConsultationService from "./waxConsultation.service";

class WaxConsultationController {
  async createWaxConsultation(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const waxConsultation =
      await waxConsultationService.createWaxConsultation(props);

    res.status(200).json(waxConsultation);
  }

  async updateWaxConsultation(req: Request, res: Response) {
    const { waxConsultationId } = req.params;
    const props = {
      id: waxConsultationId,
      company: req.auth.companyId,
      ...req.body,
    };

    const waxConsultation =
      await waxConsultationService.updateWaxConsultation(props);

    res.status(200).json(waxConsultation);
  }

  async deleteWaxConsultation(req: Request, res: Response) {
    const { waxConsultationId } = req.params;
    const props = {
      id: waxConsultationId,
      company: req.auth.companyId,
    };

    await waxConsultationService.deleteWaxConsultation(props);

    res.status(204).json();
  }

  async getwaxConsultationById(req: Request, res: Response) {
    const { waxConsultationId } = req.params;
    const props = {
      id: waxConsultationId,
      company: req.auth.companyId,
    };

    const waxConsultation =
      await waxConsultationService.getWaxConsultationById(props);

    res.status(200).json(waxConsultation);
  }

  async getWaxConsultations(req: Request, res: Response) {
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

    const waxConsultations =
      await waxConsultationService.getWaxConsultations(props);

    res.status(200).json(waxConsultations);
  }
}

export default new WaxConsultationController();
