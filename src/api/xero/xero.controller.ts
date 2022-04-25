import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import xeroService from "./xero.service";

class XeroController {
  async connectXero(req: Request, res: Response) {
    const xero = await xeroService.connectXero();

    res.status(200).json(xero);
  }

  async isConnectedToXero(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const isConnected = await xeroService.isConnectedToXero(props);

    res.status(200).json(isConnected);
  }

  async disconnectXero(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    await xeroService.disconnectXero(props);

    res.status(204).json();
  }
  async callbackXero(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const tokenSet = await xeroService.callbackXero(props);
    res.status(200).json(tokenSet);
  }
  async getCustomers(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
    };

    const customerList = await xeroService.getCustomers(props);
    res.status(200).json(customerList);
  }
}

export default new XeroController();
