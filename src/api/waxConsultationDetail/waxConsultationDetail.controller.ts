import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import waxConsultationDetailService from "./waxConsultationDetail.service";

class WaxConsultationDetailController {
  async createWaxConsultationDetail(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const waxConsultationDetail =
      await waxConsultationDetailService.createWaxConsultationDetail(props);

    res.status(200).json(waxConsultationDetail);
  }

  async updateWaxConsultationDetail(req: Request, res: Response) {
    const { waxConsultationDetailId } = req.params;
    const props = {
      id: waxConsultationDetailId,
      company: req.auth.companyId,
      ...req.body,
    };

    const waxConsultationDetail =
      await waxConsultationDetailService.updateWaxConsultationDetail(props);

    res.status(200).json(waxConsultationDetail);
  }

  async deleteWaxConsultationDetail(req: Request, res: Response) {
    const { waxConsultationDetailId } = req.params;
    const props = {
      id: waxConsultationDetailId,
      company: req.auth.companyId,
    };

    await waxConsultationDetailService.deleteWaxConsultationDetail(props);

    res.status(204).json();
  }

  async getwaxConsultationDetailById(req: Request, res: Response) {
    const { waxConsultationDetailId } = req.params;
    const props = {
      id: waxConsultationDetailId,
      company: req.auth.companyId,
    };

    const waxConsultationDetail =
      await waxConsultationDetailService.getWaxConsultationDetailById(props);

    res.status(200).json(waxConsultationDetail);
  }

  async getWaxConsultationDetails(req: Request, res: Response) {
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

    const waxConsultationDetails =
      await waxConsultationDetailService.getWaxConsultationDetails(props);

    res.status(200).json(waxConsultationDetails);
  }
}

export default new WaxConsultationDetailController();
