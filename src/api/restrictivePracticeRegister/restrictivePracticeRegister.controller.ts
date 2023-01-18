import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import restrictivePracticeRegisterService from "./restrictivePracticeRegister.service";

class RestrictivePracticeRegisterController {
  async createRestrictivePracticeRegister(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const restrictivePracticeRegister =
      await restrictivePracticeRegisterService.createRestrictivePracticeRegister(
        props
      );

    res.status(200).json(restrictivePracticeRegister);
  }

  async updateRestrictivePracticeRegister(req: Request, res: Response) {
    const { restrictivePracticeRegisterId } = req.params;
    const props = {
      id: restrictivePracticeRegisterId,
      company: req.auth.companyId,
      ...req.body,
    };

    const restrictivePracticeRegister =
      await restrictivePracticeRegisterService.updateRestrictivePracticeRegister(
        props
      );

    res.status(200).json(restrictivePracticeRegister);
  }

  async deleteRestrictivePracticeRegister(req: Request, res: Response) {
    const { restrictivePracticeRegisterId } = req.params;
    const props = {
      id: restrictivePracticeRegisterId,
      company: req.auth.companyId,
    };

    await restrictivePracticeRegisterService.deleteRestrictivePracticeRegister(
      props
    );

    res.status(204).json();
  }

  async deleteArchiveRestrictivePracticeRegister(req: Request, res: Response) {
    const { restrictivePracticeRegisterId } = req.params;
    const props = {
      id: restrictivePracticeRegisterId,
      company: req.auth.companyId,
    };

    await restrictivePracticeRegisterService.deleteArchiveRestrictivePracticeRegister(
      props
    );

    res.status(204).json();
  }

  async getrestrictivePracticeRegisterById(req: Request, res: Response) {
    const { restrictivePracticeRegisterId } = req.params;
    const props = {
      id: restrictivePracticeRegisterId,
      company: req.auth.companyId,
    };

    const restrictivePracticeRegister =
      await restrictivePracticeRegisterService.getRestrictivePracticeRegisterById(
        props
      );

    res.status(200).json(restrictivePracticeRegister);
  }

  async getRestrictivePracticeRegisters(req: Request, res: Response) {
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

    const restrictivePracticeRegisters =
      await restrictivePracticeRegisterService.getRestrictivePracticeRegisters(
        props,
        req.auth.userId
      );

    res.status(200).json(restrictivePracticeRegisters);
  }
}

export default new RestrictivePracticeRegisterController();
