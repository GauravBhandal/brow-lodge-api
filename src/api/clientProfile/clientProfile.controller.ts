import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientProfileService from "./clientProfile.service";

class ClientProfileController {
  async createClientProfile(req: Request, res: Response) {
    const params = _pick(req.body, ["firstName", "lastName"]);

    const clientProfile = await clientProfileService.createClientProfile(
      params
    );

    res.status(200).json(clientProfile);
  }

  async updateClientProfile(req: Request, res: Response) {
    const { clientProfileId } = req.params;
    const params = _pick(req.body, ["firstName", "lastName"]);

    const clientProfile = await clientProfileService.updateClientProfile(
      clientProfileId,
      params
    );

    res.status(200).json(clientProfile);
  }

  async deleteClientProfile(req: Request, res: Response) {
    const { clientProfileId } = req.params;

    const clientProfile = await clientProfileService.deleteClientProfile(
      clientProfileId
    );

    res.status(200).json(clientProfile);
  }

  async getclientProfileById(req: Request, res: Response) {
    const { clientProfileId } = req.params;

    const clientProfile = await clientProfileService.getClientProfileById(
      clientProfileId
    );

    res.status(200).json(clientProfile);
  }

  async getClientProfiles(req: Request, res: Response) {
    const queryParams = _pick(req.query, ["page", "pageSize", "sort"]) as any;

    const clientProfiles = await clientProfileService.getClientProfiles(
      queryParams
    );

    res.status(200).json(clientProfiles);
  }
}

export default new ClientProfileController();
