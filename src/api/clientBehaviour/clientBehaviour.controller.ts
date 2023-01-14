import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clientBehaviourService from "./clientBehaviour.service";

class ClientBehaviourController {
  async createClientBehaviour(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clientBehaviour = await clientBehaviourService.createClientBehaviour(
      props
    );

    res.status(200).json(clientBehaviour);
  }

  async updateClientBehaviour(req: Request, res: Response) {
    const { clientBehaviourId } = req.params;
    const props = {
      id: clientBehaviourId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clientBehaviour = await clientBehaviourService.updateClientBehaviour(
      props
    );

    res.status(200).json(clientBehaviour);
  }

  async deleteArchiveClientBehaviour(req: Request, res: Response) {
    const { clientBehaviourId } = req.params;
    const props = {
      id: clientBehaviourId,
      company: req.auth.companyId,
    };

    await clientBehaviourService.deleteArchiveClientBehaviour(props);

    res.status(204).json();
  }

  async deleteClientBehaviour(req: Request, res: Response) {
    const { clientBehaviourId } = req.params;
    const props = {
      id: clientBehaviourId,
      company: req.auth.companyId,
    };

    await clientBehaviourService.deleteClientBehaviour(props);

    res.status(204).json();
  }

  async getclientBehaviourById(req: Request, res: Response) {
    const { clientBehaviourId } = req.params;
    const props = {
      id: clientBehaviourId,
      company: req.auth.companyId,
    };

    const clientBehaviour = await clientBehaviourService.getClientBehaviourById(
      props
    );

    res.status(200).json(clientBehaviour);
  }

  async getClientBehaviours(req: Request, res: Response) {
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

    const clientBehaviours = await clientBehaviourService.getClientBehaviours(
      props,
      req.auth.userId
    );

    res.status(200).json(clientBehaviours);
  }
}

export default new ClientBehaviourController();
