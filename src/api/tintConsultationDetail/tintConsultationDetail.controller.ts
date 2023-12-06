import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import tintConsultationDetailService from "./tintConsultationDetail.service";

class TintConsultationDetailController {
  async createTintConsultationDetail(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const tintConsultationDetail =
      await tintConsultationDetailService.createTintConsultationDetail(props);

    res.status(200).json(tintConsultationDetail);
  }

  async updateTintConsultationDetail(req: Request, res: Response) {
    const { tintConsultationDetailId } = req.params;
    const props = {
      id: tintConsultationDetailId,
      company: req.auth.companyId,
      ...req.body,
    };

    const tintConsultationDetail =
      await tintConsultationDetailService.updateTintConsultationDetail(props);

    res.status(200).json(tintConsultationDetail);
  }

  async deleteTintConsultationDetail(req: Request, res: Response) {
    const { tintConsultationDetailId } = req.params;
    const props = {
      id: tintConsultationDetailId,
      company: req.auth.companyId,
    };

    await tintConsultationDetailService.deleteTintConsultationDetail(props);

    res.status(204).json();
  }

  async gettintConsultationDetailById(req: Request, res: Response) {
    const { tintConsultationDetailId } = req.params;
    const props = {
      id: tintConsultationDetailId,
      company: req.auth.companyId,
    };

    const tintConsultationDetail =
      await tintConsultationDetailService.getTintConsultationDetailById(props);

    res.status(200).json(tintConsultationDetail);
  }

  async getTintConsultationDetails(req: Request, res: Response) {
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

    const tintConsultationDetails =
      await tintConsultationDetailService.getTintConsultationDetails(props);

    res.status(200).json(tintConsultationDetails);
  }
}

export default new TintConsultationDetailController();
