import { Response, Request } from "express";
import { pick as _pick } from "lodash";
import { staffProfileService } from "../staffProfile";

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

  async getMyShiftRecords(req: Request, res: Response) {
    const queryParams = _pick(req.query, [
      "page",
      "pageSize",
      "sort",
      "where",
    ]) as any;
    const staffProps = {
      company: req.auth.companyId,
      user: req.auth.userId,
    };

    const staffProfile = await staffProfileService.getStaffProfileByUser(
      staffProps
    );

    if (!staffProfile) {
      res.status(200).json({ data: [], total: 0, page: 1, pageCount: 0 });
      return;
    }

    const shiftProps = {
      company: req.auth.companyId,
      ...queryParams,
      where: {
        "Staff.id_eq": staffProfile.id,
        ...queryParams["where"],
      },
    };
    const shiftRecords = await shiftRecordService.getShiftRecords(shiftProps);

    res.status(200).json(shiftRecords);
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
