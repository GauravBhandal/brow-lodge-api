import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import clockInClockOutService from "./clockInClockOut.service";

class ClockInClockOutController {
  async createClockInClockOut(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const clockInClockOut = await clockInClockOutService.createClockInClockOut(
      props
    );

    res.status(200).json(clockInClockOut);
  }

  async updateClockInClockOut(req: Request, res: Response) {
    const { clockInClockOutId } = req.params;
    const props = {
      id: clockInClockOutId,
      company: req.auth.companyId,
      ...req.body,
    };

    const clockInClockOut = await clockInClockOutService.updateClockInClockOut(
      props
    );

    res.status(200).json(clockInClockOut);
  }

  async deleteClockInClockOut(req: Request, res: Response) {
    const { clockInClockOutId } = req.params;
    const props = {
      id: clockInClockOutId,
      company: req.auth.companyId,
    };

    await clockInClockOutService.deleteClockInClockOut(props);

    res.status(204).json();
  }

  async getclockInClockOutById(req: Request, res: Response) {
    const { clockInClockOutId } = req.params;
    const props = {
      id: clockInClockOutId,
      company: req.auth.companyId,
    };

    const clockInClockOut = await clockInClockOutService.getClockInClockOutById(
      props
    );

    res.status(200).json(clockInClockOut);
  }

  async getClockInClockOuts(req: Request, res: Response) {
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

    const clockInClockOuts = await clockInClockOutService.getClockInClockOuts(
      props,
      req.auth.userId
    );

    res.status(200).json(clockInClockOuts);
  }
}

export default new ClockInClockOutController();
