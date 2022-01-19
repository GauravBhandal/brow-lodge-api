import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import transportBehaviourService from "./transportBehaviour.service";

class TransportBehaviourController {
  async createTransportBehaviour(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const transportBehaviour =
      await transportBehaviourService.createTransportBehaviour(props);

    res.status(200).json(transportBehaviour);
  }

  async updateTransportBehaviour(req: Request, res: Response) {
    const { transportBehaviourId } = req.params;
    const props = {
      id: transportBehaviourId,
      company: req.auth.companyId,
      ...req.body,
    };

    const transportBehaviour =
      await transportBehaviourService.updateTransportBehaviour(props);

    res.status(200).json(transportBehaviour);
  }

  async deleteTransportBehaviour(req: Request, res: Response) {
    const { transportBehaviourId } = req.params;
    const props = {
      id: transportBehaviourId,
      company: req.auth.companyId,
    };

    await transportBehaviourService.deleteTransportBehaviour(props);

    res.status(204).json();
  }

  async gettransportBehaviourById(req: Request, res: Response) {
    const { transportBehaviourId } = req.params;
    const props = {
      id: transportBehaviourId,
      company: req.auth.companyId,
    };

    const transportBehaviour =
      await transportBehaviourService.getTransportBehaviourById(props);

    res.status(200).json(transportBehaviour);
  }

  async getTransportBehaviours(req: Request, res: Response) {
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

    const transportBehaviours =
      await transportBehaviourService.getTransportBehaviours(props);

    res.status(200).json(transportBehaviours);
  }
}

export default new TransportBehaviourController();
