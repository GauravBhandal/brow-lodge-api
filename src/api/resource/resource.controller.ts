import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import resourceService from "./resource.service";

class ResourceController {
  async createResource(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const resource = await resourceService.createResource(props);

    res.status(200).json(resource);
  }

  async updateResource(req: Request, res: Response) {
    const { resourceId } = req.params;
    const props = {
      id: resourceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const resource = await resourceService.updateResource(props);

    res.status(200).json(resource);
  }

  async deleteResource(req: Request, res: Response) {
    const { resourceId } = req.params;
    const props = {
      id: resourceId,
      company: req.auth.companyId,
    };

    await resourceService.deleteResource(props);

    res.status(204).json();
  }

  async getresourceById(req: Request, res: Response) {
    const { resourceId } = req.params;
    const props = {
      id: resourceId,
      company: req.auth.companyId,
    };

    const resource = await resourceService.getResourceById(props);

    res.status(200).json(resource);
  }

  async getResources(req: Request, res: Response) {
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

    const resources = await resourceService.getResources(props);

    res.status(200).json(resources);
  }
}

export default new ResourceController();
