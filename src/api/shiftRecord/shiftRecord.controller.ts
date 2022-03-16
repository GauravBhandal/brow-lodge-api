import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import shiftRecordService from "./shiftRecord.service";

class ShiftRecordController {
  async createShiftRecord(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    if (req.body.repeat) {
      const shiftRecords = await shiftRecordService.createShiftRecordInBulk(
        props
      );
      res.status(200).json(shiftRecords);
    } else {
      const shiftRecord = await shiftRecordService.createShiftRecord(props);
      res.status(200).json(shiftRecord);
    }
  }

  async updateShiftRecord(req: Request, res: Response) {
    const { shiftRecordId } = req.params;
    const props = {
      id: shiftRecordId,
      company: req.auth.companyId,
      ...req.body,
    };

    const shiftRecord = await shiftRecordService.updateShiftRecord(props);

    res.status(200).json(shiftRecord);
  }

  async deleteShiftRecord(req: Request, res: Response) {
    const { shiftRecordId } = req.params;
    const props = {
      id: shiftRecordId,
      company: req.auth.companyId,
      ...req.body,
    };

    await shiftRecordService.deleteShiftRecord(props);

    res.status(204).json();
  }

  async getshiftRecordById(req: Request, res: Response) {
    const { shiftRecordId } = req.params;
    const props = {
      id: shiftRecordId,
      company: req.auth.companyId,
    };

    const shiftRecord = await shiftRecordService.getShiftRecordById(props);

    res.status(200).json(shiftRecord);
  }

  async getShiftRecords(req: Request, res: Response) {
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

    const shiftRecords = await shiftRecordService.getShiftRecords(props);

    res.status(200).json(shiftRecords);
  }
}

export default new ShiftRecordController();
