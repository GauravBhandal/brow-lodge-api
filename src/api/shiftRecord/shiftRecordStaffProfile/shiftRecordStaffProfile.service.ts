import ShiftRecordStaffProfileModel from "./shiftRecordStaffProfile.model";
import {
  CreateBulkShiftRecordStaffProfileProps,
  UpdateBulkShiftRecordStaffProfileProps,
  DeleteBulkShiftRecordStaffProfileProps,
} from "./shiftRecordStaffProfile.types";

class ShiftRecordStaffProfileService {
  async createBulkShiftRecordStaffProfile(
    props: CreateBulkShiftRecordStaffProfileProps
  ) {
    const createProps = props.staff.map((staffProfile) => ({
      shift: props.shift,
      staff: staffProfile,
    }));

    const shiftRecordStaffProfile =
      await ShiftRecordStaffProfileModel.bulkCreate(createProps);
    return shiftRecordStaffProfile;
  }

  async updateBulkShiftRecordStaffProfile(
    props: UpdateBulkShiftRecordStaffProfileProps
  ) {
    // Delete all the existing staffProfiles for the given shift
    await this.deleteBulkShiftRecordStaffProfile({
      shift: props.shift,
    });

    // Then assign the new staffProfiles to the given shift
    const shiftRecordStaffProfile =
      await this.createBulkShiftRecordStaffProfile(props);
    return shiftRecordStaffProfile;
  }

  async deleteBulkShiftRecordStaffProfile(
    props: DeleteBulkShiftRecordStaffProfileProps
  ) {
    const { shift } = props;
    await ShiftRecordStaffProfileModel.destroy({
      where: {
        shift,
      },
    });
  }
}

export default new ShiftRecordStaffProfileService();
