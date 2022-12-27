import RestrictivePracticeLogTypeModel from "./restrictivePracticeLogType.model";
import {
  CreateBulkRestrictivePracticeLogTypeProps,
  UpdateBulkRestrictivePracticeLogTypeProps,
  DeleteBulkRestrictivePracticeLogTypeProps,
} from "./restrictivePracticeLogType.types";

class RestrictivePracticeLogTypeService {
  async createBulkRestrictivePracticeLogType(
    props: CreateBulkRestrictivePracticeLogTypeProps
  ) {
    const createProps = props.type.map((subType) => ({
      restrictivePracticeLog: props.restrictivePracticeLog,
      type: subType,
    }));

    const restrictivePracticeLogType =
      await RestrictivePracticeLogTypeModel.bulkCreate(createProps);
    return restrictivePracticeLogType;
  }

  async updateBulkRestrictivePracticeLogType(
    props: UpdateBulkRestrictivePracticeLogTypeProps
  ) {
    // Delete all the existing types for the given restrictivePracticeLog
    await this.deleteBulkRestrictivePracticeLogType({
      restrictivePracticeLog: props.restrictivePracticeLog,
    });

    // Then assign the new types to the given restrictivePracticeLog
    const restrictivePracticeLogType =
      await this.createBulkRestrictivePracticeLogType(props);
    return restrictivePracticeLogType;
  }

  async deleteBulkRestrictivePracticeLogType(
    props: DeleteBulkRestrictivePracticeLogTypeProps
  ) {
    const { restrictivePracticeLog } = props;
    await RestrictivePracticeLogTypeModel.destroy({
      where: {
        restrictivePracticeLog,
      },
    });
  }
}

export default new RestrictivePracticeLogTypeService();
