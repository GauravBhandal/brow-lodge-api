import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import serviceDeliveryService from "./serviceDelivery.service";

class ServiceDeliveryController {
  async createServiceDelivery(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const serviceDelivery = await serviceDeliveryService.createServiceDelivery(props);

    res.status(200).json(serviceDelivery);
  }

  async updateServiceDelivery(req: Request, res: Response) {
    const { serviceDeliveryId } = req.params;
    const props = {
      id: serviceDeliveryId,
      company: req.auth.companyId,
      ...req.body,
    };

    const serviceDelivery = await serviceDeliveryService.updateServiceDelivery(props);

    res.status(200).json(serviceDelivery);
  }

  async deleteServiceDelivery(req: Request, res: Response) {
    const { serviceDeliveryId } = req.params;
    const props = {
      id: serviceDeliveryId,
      company: req.auth.companyId,
    };

    await serviceDeliveryService.deleteServiceDelivery(props);

    res.status(204).json();
  }

  async getserviceDeliveryById(req: Request, res: Response) {
    const { serviceDeliveryId } = req.params;
    const props = {
      id: serviceDeliveryId,
      company: req.auth.companyId,
    };

    const serviceDelivery = await serviceDeliveryService.getServiceDeliveryById(props);

    res.status(200).json(serviceDelivery);
  }

  async getServiceDeliveries(req: Request, res: Response) {
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

    const serviceDeliveries = await serviceDeliveryService.getServiceDeliveries(
      props,
      req.auth.userId
    );

    res.status(200).json(serviceDeliveries);
  }
}

export default new ServiceDeliveryController();
