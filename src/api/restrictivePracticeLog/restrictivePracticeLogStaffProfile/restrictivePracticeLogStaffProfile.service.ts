import RestrictivePracticeLogStaffProfileModel from "./restrictivePracticeLogStaffProfile.model";
import {
  CreateBulkRestrictivePracticeLogStaffProfileProps,
  UpdateBulkRestrictivePracticeLogStaffProfileProps,
  DeleteBulkRestrictivePracticeLogStaffProfileProps,
} from "./restrictivePracticeLogStaffProfile.types";

class RestrictivePracticeLogStaffProfileService {
  async createBulkRestrictivePracticeLogStaffProfile(
    props: CreateBulkRestrictivePracticeLogStaffProfileProps
  ) {
    const createProps = props.staff.map((staffProfile) => ({
      relation: props.relation,
      staff: staffProfile,
    }));

    const restrictivePracticeLogStaffProfile =
      await RestrictivePracticeLogStaffProfileModel.bulkCreate(createProps);
    return restrictivePracticeLogStaffProfile;
  }

  async updateBulkRestrictivePracticeLogStaffProfile(
    props: UpdateBulkRestrictivePracticeLogStaffProfileProps
  ) {
    // Delete all the existing staffProfiles for the given restrictivePracticeLog
    await this.deleteBulkRestrictivePracticeLogStaffProfile({
      relation: props.relation,
    });

    // Then assign the new staffProfiles to the given restrictivePracticeLog
    const restrictivePracticeLogStaffProfile =
      await this.createBulkRestrictivePracticeLogStaffProfile(props);
    return restrictivePracticeLogStaffProfile;
  }

  async deleteBulkRestrictivePracticeLogStaffProfile(
    props: DeleteBulkRestrictivePracticeLogStaffProfileProps
  ) {
    const { relation } = props;
    await RestrictivePracticeLogStaffProfileModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new RestrictivePracticeLogStaffProfileService();
