import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffProfileService from "./staffProfile.service";

class StaffProfileController {
  async createStaffProfile(req: Request, res: Response) {
    const props = {
      company: req.auth.companyId,
      ...req.body,
    };

    const staffProfile = await staffProfileService.createStaffProfile(props);

    res.status(200).json(staffProfile);
  }

  async updateStaffProfile(req: Request, res: Response) {
    const { staffProfileId } = req.params;
    const props = {
      id: staffProfileId,
      company: req.auth.companyId,
      ...req.body,
    };

    const staffProfile = await staffProfileService.updateStaffProfile(props);

    res.status(200).json(staffProfile);
  }

  async deleteStaffProfile(req: Request, res: Response) {
    const { staffProfileId } = req.params;
    const props = {
      id: staffProfileId,
      company: req.auth.companyId,
    };

    await staffProfileService.deleteStaffProfile(props);

    res.status(204).json();
  }

  async getstaffProfileById(req: Request, res: Response) {
    const { staffProfileId } = req.params;
    const props = {
      id: staffProfileId,
      company: req.auth.companyId,
    };

    const staffProfile = await staffProfileService.getStaffProfileById(props);

    res.status(200).json(staffProfile);
  }

  async getStaffProfiles(req: Request, res: Response) {
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

    const staffProfiles = await staffProfileService.getStaffProfiles(props);

    res.status(200).json(staffProfiles);
  }
}

export default new StaffProfileController();
