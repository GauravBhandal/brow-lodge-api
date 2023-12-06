import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import tintConsultationService from "./tintConsultation.service";

class TintConsultationController {
  async createTintConsultation(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const tintConsultation =
      await tintConsultationService.createTintConsultation(props);

    res.status(200).json(tintConsultation);
  }

  async updateTintConsultation(req: Request, res: Response) {
    const { tintConsultationId } = req.params;
    const props = {
      id: tintConsultationId,
      company: req.auth.companyId,
      ...req.body,
    };

    const tintConsultation =
      await tintConsultationService.updateTintConsultation(props);

    res.status(200).json(tintConsultation);
  }

  async deleteTintConsultation(req: Request, res: Response) {
    const { tintConsultationId } = req.params;
    const props = {
      id: tintConsultationId,
      company: req.auth.companyId,
    };

    await tintConsultationService.deleteTintConsultation(props);

    res.status(204).json();
  }

  async gettintConsultationById(req: Request, res: Response) {
    const { tintConsultationId } = req.params;
    const props = {
      id: tintConsultationId,
      company: req.auth.companyId,
    };

    const tintConsultation =
      await tintConsultationService.getTintConsultationById(props);

    res.status(200).json(tintConsultation);
  }

  async getTintConsultations(req: Request, res: Response) {
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

    const tintConsultations =
      await tintConsultationService.getTintConsultations(props);

    res.status(200).json(tintConsultations);
  }
}

export default new TintConsultationController();
