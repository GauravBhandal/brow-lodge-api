import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientDocumentTypeService from "./clientDocumentType.service";

class ClientDocumentTypeController {
  async createClientDocumentType(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clientDocumentType =
      await clientDocumentTypeService.createClientDocumentType(props);

    res.status(200).json(clientDocumentType);
  }

  async updateClientDocumentType(req: Request, res: Response) {
    const { clientDocumentTypeId } = req.params;
    const props = {
      id: clientDocumentTypeId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientDocumentType =
      await clientDocumentTypeService.updateClientDocumentType(props);

    res.status(200).json(clientDocumentType);
  }

  async deleteClientDocumentType(req: Request, res: Response) {
    const { clientDocumentTypeId } = req.params;
    const props = {
      id: clientDocumentTypeId,
      company: req.auth.companyId,
    };

    await clientDocumentTypeService.deleteClientDocumentType(props);

    res.status(204).json();
  }

  async getclientDocumentTypeById(req: Request, res: Response) {
    const { clientDocumentTypeId } = req.params;
    const props = {
      id: clientDocumentTypeId,
      company: req.auth.companyId,
    };

    const clientDocumentType =
      await clientDocumentTypeService.getClientDocumentTypeById(props);

    res.status(200).json(clientDocumentType);
  }

  async getClientDocumentTypes(req: Request, res: Response) {
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

    const clientDocumentTypes =
      await clientDocumentTypeService.getClientDocumentTypes(props);

    res.status(200).json(clientDocumentTypes);
  }
}

export default new ClientDocumentTypeController();
