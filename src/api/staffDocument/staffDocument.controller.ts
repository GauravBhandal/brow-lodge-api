import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffDocumentService from "./staffDocument.service";

class StaffDocumentController {
  async createStaffDocument(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const staffDocument = await staffDocumentService.createStaffDocument(props);

    res.status(200).json(staffDocument);
  }

  async updateStaffDocument(req: Request, res: Response) {
    const { staffDocumentId } = req.params;
    const props = {
      id: staffDocumentId,
      company: req.auth.companyId,
      ...req.body,
    };

    const staffDocument = await staffDocumentService.updateStaffDocument(props);

    res.status(200).json(staffDocument);
  }

  async deleteStaffDocument(req: Request, res: Response) {
    const { staffDocumentId } = req.params;
    const props = {
      id: staffDocumentId,
      company: req.auth.companyId,
    };

    await staffDocumentService.deleteStaffDocument(props);

    res.status(204).json();
  }

  async deleteArchiveStaffDocument(req: Request, res: Response) {
    const { staffDocumentId } = req.params;
    const props = {
      id: staffDocumentId,
      company: req.auth.companyId,
    };

    await staffDocumentService.deleteArchiveStaffDocument(props);

    res.status(204).json();
  }

  async getstaffDocumentById(req: Request, res: Response) {
    const { staffDocumentId } = req.params;
    const props = {
      id: staffDocumentId,
      company: req.auth.companyId,
    };

    const staffDocument = await staffDocumentService.getStaffDocumentById(
      props
    );

    res.status(200).json(staffDocument);
  }

  async getStaffDocuments(req: Request, res: Response) {
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

    const staffDocuments = await staffDocumentService.getStaffDocuments(props);

    res.status(200).json(staffDocuments);
  }
}

export default new StaffDocumentController();
