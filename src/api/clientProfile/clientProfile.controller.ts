import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientProfileService from "./clientProfile.service";

class ClientProfileController {
  async createClientProfile(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clientProfile = await clientProfileService.createClientProfile(props);

    res.status(200).json(clientProfile);
  }

  async updateClientProfile(req: Request, res: Response) {
    const { clientProfileId } = req.params;
    const props = {
      id: clientProfileId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientProfile = await clientProfileService.updateClientProfile(props);

    res.status(200).json(clientProfile);
  }

  async deleteClientProfile(req: Request, res: Response) {
    const { clientProfileId } = req.params;
    const props = {
      id: clientProfileId,
      company: req.auth.companyId,
    };

    await clientProfileService.deleteClientProfile(props);

    res.status(204).json();
  }

  async getclientProfileById(req: Request, res: Response) {
    const { clientProfileId } = req.params;
    const props = {
      id: clientProfileId,
      company: req.auth.companyId,
    };

    const clientProfile = await clientProfileService.getClientProfileById(
      props
    );

    res.status(200).json(clientProfile);
  }

  async getClientProfiles(req: Request, res: Response) {
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

    const clientProfiles = await clientProfileService.getClientProfiles(
      props,
      req.auth.userId
    );

    res.status(200).json(clientProfiles);
  }
}

export default new ClientProfileController();
