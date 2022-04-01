import ShiftRecordClientProfileModel from "./shiftRecordClientProfile.model";
import {
  CreateBulkShiftRecordClientProfileProps,
  UpdateBulkShiftRecordClientProfileProps,
  DeleteBulkShiftRecordClientProfileProps,
} from "./shiftRecordClientProfile.types";

class ShiftRecordClientProfileService {
  async createBulkShiftRecordClientProfile(
    props: CreateBulkShiftRecordClientProfileProps
  ) {
    const createProps = props.client.map((clientProfile) => ({
      shift: props.shift,
      client: clientProfile,
    }));

    const shiftRecordClientProfile =
      await ShiftRecordClientProfileModel.bulkCreate(createProps);
    return shiftRecordClientProfile;
  }

  async updateBulkShiftRecordClientProfile(
    props: UpdateBulkShiftRecordClientProfileProps
  ) {
    // Delete all the existing clientProfiles for the given shift
    await this.deleteBulkShiftRecordClientProfile({
      shift: props.shift,
    });

    // Then assign the new clientProfiles to the given shift
    const shiftRecordClientProfile =
      await this.createBulkShiftRecordClientProfile(props);
    return shiftRecordClientProfile;
  }

  async deleteBulkShiftRecordClientProfile(
    props: DeleteBulkShiftRecordClientProfileProps
  ) {
    const { shift } = props;
    await ShiftRecordClientProfileModel.destroy({
      where: {
        shift,
      },
    });
  }
}

export default new ShiftRecordClientProfileService();
