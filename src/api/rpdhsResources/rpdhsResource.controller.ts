import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import rpdhsResourceService from "./rpdhsResource.service";

class RpdhsResourceController {
  async createRpdhsResource(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const rpdhsResource = await rpdhsResourceService.createRpdhsResource(props);

    res.status(200).json(rpdhsResource);
  }

  async updateRpdhsResource(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const rpdhsResource = await rpdhsResourceService.updateRpdhsResource(props);

    res.status(200).json(rpdhsResource);
  }

  async deleteRpdhsResource(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
    };

    await rpdhsResourceService.deleteRpdhsResource(props);

    res.status(204).json();
  }

  async deleteArchiveRpdhsResource(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
    };

    await rpdhsResourceService.deleteArchiveRpdhsResource(props);

    res.status(204).json();
  }

  async getrpdhsResourceById(req: Request, res: Response) {
    const { rpdhsResourceId } = req.params;
    const props = {
      id: rpdhsResourceId,
      company: req.auth.companyId,
    };

    const rpdhsResource = await rpdhsResourceService.getRpdhsResourceById(
      props
    );

    res.status(200).json(rpdhsResource);
  }

  async getRpdhsResources(req: Request, res: Response) {
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

    const rpdhsResources = await rpdhsResourceService.getRpdhsResources(
      props,
      req.auth.userId
    );

    res.status(200).json(rpdhsResources);
  }
}

export default new RpdhsResourceController();
