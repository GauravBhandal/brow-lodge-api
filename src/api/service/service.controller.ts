import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import serviceService from "./service.service";

class ServiceController {
  async createService(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const service = await serviceService.createService(props);

    res.status(200).json(service);
  }

  async updateService(req: Request, res: Response) {
    const { serviceId } = req.params;
    const props = {
      id: serviceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const service = await serviceService.updateService(props);

    res.status(200).json(service);
  }

  async deleteService(req: Request, res: Response) {
    const { serviceId } = req.params;
    const props = {
      id: serviceId,
      company: req.auth.companyId,
    };

    await serviceService.deleteService(props);

    res.status(204).json();
  }

  async getserviceById(req: Request, res: Response) {
    const { serviceId } = req.params;
    const props = {
      id: serviceId,
      company: req.auth.companyId,
    };

    const service = await serviceService.getServiceById(props);

    res.status(200).json(service);
  }

  async getServices(req: Request, res: Response) {
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

    const services = await serviceService.getServices(props);

    res.status(200).json(services);
  }
}

export default new ServiceController();
