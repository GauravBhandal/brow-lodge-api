import ProgressNoteStaffProfileModel from "./progressNoteStaffProfile.model";
import {
  CreateBulkProgressNoteStaffProfileProps,
  UpdateBulkProgressNoteStaffProfileProps,
  DeleteBulkProgressNoteStaffProfileProps,
} from "./progressNoteStaffProfile.types";

class ProgressNoteStaffProfileService {
  async createBulkProgressNoteStaffProfile(
    props: CreateBulkProgressNoteStaffProfileProps
  ) {
    const createProps = props.staff.map((staffProfile) => ({
      progressNote: props.progressNote,
      staff: staffProfile,
    }));

    const progressNoteStaffProfile =
      await ProgressNoteStaffProfileModel.bulkCreate(createProps);
    return progressNoteStaffProfile;
  }

  async updateBulkProgressNoteStaffProfile(
    props: UpdateBulkProgressNoteStaffProfileProps
  ) {
    // Delete all the existing staffProfiles for the given progressNote
    await this.deleteBulkProgressNoteStaffProfile({
      progressNote: props.progressNote,
    });

    // Then assign the new staffProfiles to the given progressNote
    const progressNoteStaffProfile =
      await this.createBulkProgressNoteStaffProfile(props);
    return progressNoteStaffProfile;
  }

  async deleteBulkProgressNoteStaffProfile(
    props: DeleteBulkProgressNoteStaffProfileProps
  ) {
    const { progressNote } = props;
    await ProgressNoteStaffProfileModel.destroy({
      where: {
        progressNote,
      },
    });
  }
}

export default new ProgressNoteStaffProfileService();
