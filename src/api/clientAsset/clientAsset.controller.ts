import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientAssetService from "./clientAsset.service";

class ClientAssetController {
  async createClientAsset(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clientAsset = await clientAssetService.createClientAsset(props);

    res.status(200).json(clientAsset);
  }

  async updateClientAsset(req: Request, res: Response) {
    const { clientAssetId } = req.params;
    const props = {
      id: clientAssetId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientAsset = await clientAssetService.updateClientAsset(props);

    res.status(200).json(clientAsset);
  }

  async deleteClientAsset(req: Request, res: Response) {
    const { clientAssetId } = req.params;
    const props = {
      id: clientAssetId,
      company: req.auth.companyId,
    };

    await clientAssetService.deleteClientAsset(props);

    res.status(204).json();
  }

  async getclientAssetById(req: Request, res: Response) {
    const { clientAssetId } = req.params;
    const props = {
      id: clientAssetId,
      company: req.auth.companyId,
    };

    const clientAsset = await clientAssetService.getClientAssetById(props);

    res.status(200).json(clientAsset);
  }

  async getClientAssets(req: Request, res: Response) {
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

    const clientAssets = await clientAssetService.getClientAssets(
      props,
      req.auth.userId
    );

    res.status(200).json(clientAssets);
  }
}

export default new ClientAssetController();
