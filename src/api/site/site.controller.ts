import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import siteService from "./site.service";

class SiteController {
  async createSite(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const site =
      await siteService.createSite(props);

    res.status(200).json(site);
  }

  async updateSite(req: Request, res: Response) {
    const { siteId } = req.params;
    const props = {
      id: siteId,
      company: req.auth.companyId,
      ...req.body,
    };

    const site =
      await siteService.updateSite(props);

    res.status(200).json(site);
  }

  async deleteSite(req: Request, res: Response) {
    const { siteId } = req.params;
    const props = {
      id: siteId,
      company: req.auth.companyId,
    };

    await siteService.deleteSite(props);

    res.status(204).json();
  }

  async getsiteById(req: Request, res: Response) {
    const { siteId } = req.params;
    const props = {
      id: siteId,
      company: req.auth.companyId,
    };

    const site =
      await siteService.getSiteById(props);

    res.status(200).json(site);
  }

  async getSites(req: Request, res: Response) {
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

    const sites =
      await siteService.getSites(props);

    res.status(200).json(sites);
  }
}

export default new SiteController();
