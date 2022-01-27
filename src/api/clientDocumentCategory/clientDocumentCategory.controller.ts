import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientDocumentCategoryService from "./clientDocumentCategory.service";

class ClientDocumentCategoryController {
  async createClientDocumentCategory(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clientDocumentCategory =
      await clientDocumentCategoryService.createClientDocumentCategory(props);

    res.status(200).json(clientDocumentCategory);
  }

  async updateClientDocumentCategory(req: Request, res: Response) {
    const { clientDocumentCategoryId } = req.params;
    const props = {
      id: clientDocumentCategoryId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientDocumentCategory =
      await clientDocumentCategoryService.updateClientDocumentCategory(props);

    res.status(200).json(clientDocumentCategory);
  }

  async deleteClientDocumentCategory(req: Request, res: Response) {
    const { clientDocumentCategoryId } = req.params;
    const props = {
      id: clientDocumentCategoryId,
      company: req.auth.companyId,
    };

    await clientDocumentCategoryService.deleteClientDocumentCategory(props);

    res.status(204).json();
  }

  async getclientDocumentCategoryById(req: Request, res: Response) {
    const { clientDocumentCategoryId } = req.params;
    const props = {
      id: clientDocumentCategoryId,
      company: req.auth.companyId,
    };

    const clientDocumentCategory =
      await clientDocumentCategoryService.getClientDocumentCategoryById(props);

    res.status(200).json(clientDocumentCategory);
  }

  async getClientDocumentCategorys(req: Request, res: Response) {
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

    const clientDocumentCategorys =
      await clientDocumentCategoryService.getClientDocumentCategorys(props);

    res.status(200).json(clientDocumentCategorys);
  }
}

export default new ClientDocumentCategoryController();
