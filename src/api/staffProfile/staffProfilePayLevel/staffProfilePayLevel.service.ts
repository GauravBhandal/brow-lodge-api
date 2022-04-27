import StaffProfilePayLevelModel from "./staffProfilePayLevel.model";
import {
  CreateBulkStaffProfilePayLevelProps,
  UpdateBulkStaffProfilePayLevelProps,
  DeleteBulkStaffProfilePayLevelProps,
} from "./staffProfilePayLevel.types";

class StaffProfilePayLevelService {
  async createBulkStaffProfilePayLevel(
    props: CreateBulkStaffProfilePayLevelProps
  ) {
    const createProps = props.paylevel.map((level) => ({
      staff: props.staff,
      paylevel: level,
    }));

    const staffProfilePayLevel = await StaffProfilePayLevelModel.bulkCreate(
      createProps
    );
    return staffProfilePayLevel;
  }

  async updateBulkStaffProfilePayLevel(
    props: UpdateBulkStaffProfilePayLevelProps
  ) {
    // Delete all the existing paylevels for the given staffProfile
    await this.deleteBulkStaffProfilePayLevel({
      staff: props.staff,
    });

    // Then assign the new paylevels to the given staffProfile
    const staffProfilePayLevel = await this.createBulkStaffProfilePayLevel(
      props
    );
    return staffProfilePayLevel;
  }

  async deleteBulkStaffProfilePayLevel(
    props: DeleteBulkStaffProfilePayLevelProps
  ) {
    const { staff } = props;
    await StaffProfilePayLevelModel.destroy({
      where: {
        staff,
      },
    });
  }
}

export default new StaffProfilePayLevelService();
