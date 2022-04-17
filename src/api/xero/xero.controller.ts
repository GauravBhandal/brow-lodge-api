import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import xeroService from "./xero.service";

class XeroController {
  async connectXero(req: Request, res: Response) {
    const xero = await xeroService.connectXero();

    res.status(200).json(xero);
  }

  async callbackXero(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };
    console.log("props", props);
    const tokenSet = await xeroService.callbackXero(props);
    res.status(200).json(tokenSet);
  }
}

export default new XeroController();
