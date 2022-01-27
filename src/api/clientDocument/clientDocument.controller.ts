import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientDocumentService from "./clientDocument.service";

class ClientDocumentController {
  async createClientDocument(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clientDocument = await clientDocumentService.createClientDocument(
      props
    );

    res.status(200).json(clientDocument);
  }

  async updateClientDocument(req: Request, res: Response) {
    const { clientDocumentId } = req.params;
    const props = {
      id: clientDocumentId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientDocument = await clientDocumentService.updateClientDocument(
      props
    );

    res.status(200).json(clientDocument);
  }

  async deleteClientDocument(req: Request, res: Response) {
    const { clientDocumentId } = req.params;
    const props = {
      id: clientDocumentId,
      company: req.auth.companyId,
    };

    await clientDocumentService.deleteClientDocument(props);

    res.status(204).json();
  }

  async getclientDocumentById(req: Request, res: Response) {
    const { clientDocumentId } = req.params;
    const props = {
      id: clientDocumentId,
      company: req.auth.companyId,
    };

    const clientDocument = await clientDocumentService.getClientDocumentById(
      props
    );

    res.status(200).json(clientDocument);
  }

  async getClientDocuments(req: Request, res: Response) {
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

    const clientDocuments = await clientDocumentService.getClientDocuments(
      props
    );

    res.status(200).json(clientDocuments);
  }
}

export default new ClientDocumentController();
