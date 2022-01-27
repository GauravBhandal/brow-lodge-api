import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffDocumentTypeService from "./staffDocumentType.service";

class StaffDocumentTypeController {
  async createStaffDocumentType(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const staffDocumentType =
      await staffDocumentTypeService.createStaffDocumentType(props);

    res.status(200).json(staffDocumentType);
  }

  async updateStaffDocumentType(req: Request, res: Response) {
    const { staffDocumentTypeId } = req.params;
    const props = {
      id: staffDocumentTypeId,
      company: req.auth.companyId,
      ...req.body,
    };

    const staffDocumentType =
      await staffDocumentTypeService.updateStaffDocumentType(props);

    res.status(200).json(staffDocumentType);
  }

  async deleteStaffDocumentType(req: Request, res: Response) {
    const { staffDocumentTypeId } = req.params;
    const props = {
      id: staffDocumentTypeId,
      company: req.auth.companyId,
    };

    await staffDocumentTypeService.deleteStaffDocumentType(props);

    res.status(204).json();
  }

  async getstaffDocumentTypeById(req: Request, res: Response) {
    const { staffDocumentTypeId } = req.params;
    const props = {
      id: staffDocumentTypeId,
      company: req.auth.companyId,
    };

    const staffDocumentType =
      await staffDocumentTypeService.getStaffDocumentTypeById(props);

    res.status(200).json(staffDocumentType);
  }

  async getStaffDocumentTypes(req: Request, res: Response) {
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

    const staffDocumentTypes =
      await staffDocumentTypeService.getStaffDocumentTypes(props);

    res.status(200).json(staffDocumentTypes);
  }
}

export default new StaffDocumentTypeController();
