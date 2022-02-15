import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import shiftTypeService from "./shiftType.service";

class ShiftTypeController {
  async createShiftType(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const shiftType = await shiftTypeService.createShiftType(props);

    res.status(200).json(shiftType);
  }

  async updateShiftType(req: Request, res: Response) {
    const { shiftTypeId } = req.params;
    const props = {
      id: shiftTypeId,
      company: req.auth.companyId,
      ...req.body,
    };

    const shiftType = await shiftTypeService.updateShiftType(props);

    res.status(200).json(shiftType);
  }

  async deleteShiftType(req: Request, res: Response) {
    const { shiftTypeId } = req.params;
    const props = {
      id: shiftTypeId,
      company: req.auth.companyId,
    };

    await shiftTypeService.deleteShiftType(props);

    res.status(204).json();
  }

  async getshiftTypeById(req: Request, res: Response) {
    const { shiftTypeId } = req.params;
    const props = {
      id: shiftTypeId,
      company: req.auth.companyId,
    };

    const shiftType = await shiftTypeService.getShiftTypeById(props);

    res.status(200).json(shiftType);
  }

  async getShiftTypes(req: Request, res: Response) {
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

    const shiftTypes = await shiftTypeService.getShiftTypes(props);

    res.status(200).json(shiftTypes);
  }
}

export default new ShiftTypeController();
