import StaffProfileModel from "./staffProfile.model";
import {
  StaffProfile,
  CreateStaffProfileProps,
  UpdateStaffProfileProps,
} from "./staffProfile.types";
import { CustomError } from "../../components/errors";
import StaffProfileErrorCode from "./staffProfile.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { QueryParams } from "../../common/types";

class StaffProfileService {
  async createStaffProfile(props: CreateStaffProfileProps) {
    const staffProfile = await StaffProfileModel.create(props);
    return staffProfile;
  }

  async updateStaffProfile(
    staffProfileId: StaffProfile["id"],
    props: UpdateStaffProfileProps
  ) {
    const staffProfile = await StaffProfileModel.findOne({
      where: { id: staffProfileId },
    });
    if (!staffProfile) {
      throw new CustomError(404, StaffProfileErrorCode.STAFF_PROFILE_NOT_FOUND);
    }
    const [, [updatedStaffProfile]] = await StaffProfileModel.update(props, {
      where: { id: staffProfileId },
      returning: true,
    });
    return updatedStaffProfile;
  }

  async deleteStaffProfile(staffProfileId: StaffProfile["id"]) {
    const staffProfile = await StaffProfileModel.destroy({
      where: { id: staffProfileId },
    });
    return staffProfile;
  }

  async getStaffProfiles(queryParams: QueryParams) {
    const { page, pageSize, sort } = queryParams;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);

    const data = await StaffProfileModel.findAndCountAll({
      offset,
      limit,
      order,
    });

    const response = getPagingData(data, page, limit);

    return response;
  }

  async getStaffProfileById(staffProfileId: StaffProfile["id"]) {
    const staffProfile = await StaffProfileModel.findOne({
      where: { id: staffProfileId },
    });
    return staffProfile;
  }
}

export default new StaffProfileService();
