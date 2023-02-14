import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffUnavailabilityService from "./staffUnavailability.service";

class StaffUnavailabilityController {
  async createStaffUnavailability(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    if (req.body.repeat) {
      const staffUnavailabilitys = await staffUnavailabilityService.createStaffUnavailabilityInBulk(
        props
      );
      res.status(200).json(staffUnavailabilitys);
    } else {
      const staffUnavailability = await staffUnavailabilityService.createStaffUnavailability(props);
      res.status(200).json(staffUnavailability);
    }
  }

  async deleteStaffUnavailability(req: Request, res: Response) {
    const { staffUnavailabilityId } = req.params;
    const props = {
      id: staffUnavailabilityId,
      company: req.auth.companyId,
      ...req.body,
    };

    await staffUnavailabilityService.deleteStaffUnavailability(props);

    res.status(204).json();
  }

  async getstaffUnavailabilityById(req: Request, res: Response) {
    const { staffUnavailabilityId } = req.params;
    const props = {
      id: staffUnavailabilityId,
      company: req.auth.companyId,
    };

    const staffUnavailability = await staffUnavailabilityService.getStaffUnavailabilityById(props);

    res.status(200).json(staffUnavailability);
  }

  async getStaffUnavailabilitys(req: Request, res: Response) {
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

    const staffUnavailabilitys = await staffUnavailabilityService.getStaffUnavailabilitys(props);

    res.status(200).json(staffUnavailabilitys);
  }
}

export default new StaffUnavailabilityController();
