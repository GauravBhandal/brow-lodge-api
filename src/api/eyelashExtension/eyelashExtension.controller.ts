import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import eyelashExtensionService from "./eyelashExtension.service";

class EyelashExtensionController {
  async createEyelashExtension(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const eyelashExtension =
      await eyelashExtensionService.createEyelashExtension(props);

    res.status(200).json(eyelashExtension);
  }

  async updateEyelashExtension(req: Request, res: Response) {
    const { eyelashExtensionId } = req.params;
    const props = {
      id: eyelashExtensionId,
      company: req.auth.companyId,
      ...req.body,
    };

    const eyelashExtension =
      await eyelashExtensionService.updateEyelashExtension(props);

    res.status(200).json(eyelashExtension);
  }

  async deleteEyelashExtension(req: Request, res: Response) {
    const { eyelashExtensionId } = req.params;
    const props = {
      id: eyelashExtensionId,
      company: req.auth.companyId,
    };

    await eyelashExtensionService.deleteEyelashExtension(props);

    res.status(204).json();
  }

  async geteyelashExtensionById(req: Request, res: Response) {
    const { eyelashExtensionId } = req.params;
    const props = {
      id: eyelashExtensionId,
      company: req.auth.companyId,
    };

    const eyelashExtension =
      await eyelashExtensionService.getEyelashExtensionById(props);

    res.status(200).json(eyelashExtension);
  }

  async getEyelashExtensions(req: Request, res: Response) {
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

    const eyelashExtensions =
      await eyelashExtensionService.getEyelashExtensions(props);

    res.status(200).json(eyelashExtensions);
  }
}

export default new EyelashExtensionController();
