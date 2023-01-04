import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffSleepDisturbanceService from "./staffSleepDisturbance.service";

class StaffSleepDisturbanceController {
  async createStaffSleepDisturbance(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const staffSleepDisturbance =
      await staffSleepDisturbanceService.createStaffSleepDisturbance(props);

    res.status(200).json(staffSleepDisturbance);
  }

  async updateStaffSleepDisturbance(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
      ...req.body,
    };

    const staffSleepDisturbance =
      await staffSleepDisturbanceService.updateStaffSleepDisturbance(props);

    res.status(200).json(staffSleepDisturbance);
  }

  async deleteStaffSleepDisturbance(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
    };

    await staffSleepDisturbanceService.deleteStaffSleepDisturbance(props);

    res.status(204).json();
  }

  async deleteArchiveStaffSleepDisturbance(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
    };

    await staffSleepDisturbanceService.deleteArchiveStaffSleepDisturbance(
      props
    );

    res.status(204).json();
  }

  async getstaffSleepDisturbanceById(req: Request, res: Response) {
    const { staffSleepDisturbanceId } = req.params;
    const props = {
      id: staffSleepDisturbanceId,
      company: req.auth.companyId,
    };

    const staffSleepDisturbance =
      await staffSleepDisturbanceService.getStaffSleepDisturbanceById(props);

    res.status(200).json(staffSleepDisturbance);
  }

  async getStaffSleepDisturbances(req: Request, res: Response) {
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

    const staffSleepDisturbances =
      await staffSleepDisturbanceService.getStaffSleepDisturbances(
        props,
        req.auth.userId
      );

    res.status(200).json(staffSleepDisturbances);
  }
}

export default new StaffSleepDisturbanceController();
