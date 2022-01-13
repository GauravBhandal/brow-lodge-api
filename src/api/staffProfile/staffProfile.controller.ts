import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import staffProfileService from "./staffProfile.service";

class StaffProfileController {
  async createStaffProfile(req: Request, res: Response) {
    const params = _pick(req.body, ["firstName", "lastName"]);

    const staffProfile = await staffProfileService.createStaffProfile(params);

    res.status(200).json(staffProfile);
  }

  async updateStaffProfile(req: Request, res: Response) {
    const { staffProfileId } = req.params;
    const params = _pick(req.body, ["firstName", "lastName"]);

    const staffProfile = await staffProfileService.updateStaffProfile(
      staffProfileId,
      params
    );

    res.status(200).json(staffProfile);
  }

  async deleteStaffProfile(req: Request, res: Response) {
    const { staffProfileId } = req.params;

    const staffProfile = await staffProfileService.deleteStaffProfile(
      staffProfileId
    );

    res.status(200).json(staffProfile);
  }

  async getstaffProfileById(req: Request, res: Response) {
    const { staffProfileId } = req.params;

    const staffProfile = await staffProfileService.getStaffProfileById(
      staffProfileId
    );

    res.status(200).json(staffProfile);
  }

  async getStaffProfiles(req: Request, res: Response) {
    const queryParams = _pick(req.query, ["page", "pageSize", "sort"]) as any;

    const staffProfiles = await staffProfileService.getStaffProfiles(
      queryParams
    );

    res.status(200).json(staffProfiles);
  }
}

export default new StaffProfileController();
