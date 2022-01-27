import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffDocumentCategoryService from "./staffDocumentCategory.service";

class StaffDocumentCategoryController {
  async createStaffDocumentCategory(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const staffDocumentCategory =
      await staffDocumentCategoryService.createStaffDocumentCategory(props);

    res.status(200).json(staffDocumentCategory);
  }

  async updateStaffDocumentCategory(req: Request, res: Response) {
    const { staffDocumentCategoryId } = req.params;
    const props = {
      id: staffDocumentCategoryId,
      company: req.auth.companyId,
      ...req.body,
    };

    const staffDocumentCategory =
      await staffDocumentCategoryService.updateStaffDocumentCategory(props);

    res.status(200).json(staffDocumentCategory);
  }

  async deleteStaffDocumentCategory(req: Request, res: Response) {
    const { staffDocumentCategoryId } = req.params;
    const props = {
      id: staffDocumentCategoryId,
      company: req.auth.companyId,
    };

    await staffDocumentCategoryService.deleteStaffDocumentCategory(props);

    res.status(204).json();
  }

  async getstaffDocumentCategoryById(req: Request, res: Response) {
    const { staffDocumentCategoryId } = req.params;
    const props = {
      id: staffDocumentCategoryId,
      company: req.auth.companyId,
    };

    const staffDocumentCategory =
      await staffDocumentCategoryService.getStaffDocumentCategoryById(props);

    res.status(200).json(staffDocumentCategory);
  }

  async getStaffDocumentCategorys(req: Request, res: Response) {
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

    const staffDocumentCategorys =
      await staffDocumentCategoryService.getStaffDocumentCategorys(props);

    res.status(200).json(staffDocumentCategorys);
  }
}

export default new StaffDocumentCategoryController();
