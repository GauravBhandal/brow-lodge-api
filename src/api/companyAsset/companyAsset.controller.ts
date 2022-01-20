import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import companyAssetService from "./companyAsset.service";

class CompanyAssetController {
  async createCompanyAsset(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const companyAsset = await companyAssetService.createCompanyAsset(props);

    res.status(200).json(companyAsset);
  }

  async updateCompanyAsset(req: Request, res: Response) {
    const { companyAssetId } = req.params;
    const props = {
      id: companyAssetId,
      company: req.auth.companyId,
      ...req.body,
    };

    const companyAsset = await companyAssetService.updateCompanyAsset(props);

    res.status(200).json(companyAsset);
  }

  async deleteCompanyAsset(req: Request, res: Response) {
    const { companyAssetId } = req.params;
    const props = {
      id: companyAssetId,
      company: req.auth.companyId,
    };

    await companyAssetService.deleteCompanyAsset(props);

    res.status(204).json();
  }

  async getcompanyAssetById(req: Request, res: Response) {
    const { companyAssetId } = req.params;
    const props = {
      id: companyAssetId,
      company: req.auth.companyId,
    };

    const companyAsset = await companyAssetService.getCompanyAssetById(props);

    res.status(200).json(companyAsset);
  }

  async getCompanyAssets(req: Request, res: Response) {
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

    const companyAssets = await companyAssetService.getCompanyAssets(props);

    res.status(200).json(companyAssets);
  }
}

export default new CompanyAssetController();
