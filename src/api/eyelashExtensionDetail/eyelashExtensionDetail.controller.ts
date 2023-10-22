import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import eyelashExtensionDetailService from "./eyelashExtensionDetail.service";

class EyelashExtensionDetailController {
  async createEyelashExtensionDetail(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const eyelashExtensionDetail =
      await eyelashExtensionDetailService.createEyelashExtensionDetail(props);

    res.status(200).json(eyelashExtensionDetail);
  }

  async updateEyelashExtensionDetail(req: Request, res: Response) {
    const { eyelashExtensionDetailId } = req.params;
    const props = {
      id: eyelashExtensionDetailId,
      company: req.auth.companyId,
      ...req.body,
    };

    const eyelashExtensionDetail =
      await eyelashExtensionDetailService.updateEyelashExtensionDetail(props);

    res.status(200).json(eyelashExtensionDetail);
  }

  async deleteEyelashExtensionDetail(req: Request, res: Response) {
    const { eyelashExtensionDetailId } = req.params;
    const props = {
      id: eyelashExtensionDetailId,
      company: req.auth.companyId,
    };

    await eyelashExtensionDetailService.deleteEyelashExtensionDetail(props);

    res.status(204).json();
  }

  async geteyelashExtensionDetailById(req: Request, res: Response) {
    const { eyelashExtensionDetailId } = req.params;
    const props = {
      id: eyelashExtensionDetailId,
      company: req.auth.companyId,
    };

    const eyelashExtensionDetail =
      await eyelashExtensionDetailService.getEyelashExtensionDetailById(props);

    res.status(200).json(eyelashExtensionDetail);
  }

  async getEyelashExtensionDetails(req: Request, res: Response) {
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

    const eyelashExtensionDetails =
      await eyelashExtensionDetailService.getEyelashExtensionDetails(props);

    res.status(200).json(eyelashExtensionDetails);
  }
}

export default new EyelashExtensionDetailController();
