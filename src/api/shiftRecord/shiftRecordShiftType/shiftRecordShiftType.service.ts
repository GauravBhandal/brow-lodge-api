import ShiftRecordShiftTypeModel from "./shiftRecordShiftType.model";
import {
  CreateBulkShiftRecordShiftTypeProps,
  UpdateBulkShiftRecordShiftTypeProps,
  DeleteBulkShiftRecordShiftTypeProps,
} from "./shiftRecordShiftType.types";

class ShiftRecordShiftTypeService {
  async createBulkShiftRecordShiftType(
    props: CreateBulkShiftRecordShiftTypeProps
  ) {
    const createProps = props.types.map((shiftType) => ({
      shift: props.shift,
      type: shiftType.type,
      startTime: shiftType.startTime,
    }));

    const shiftRecordShiftType = await ShiftRecordShiftTypeModel.bulkCreate(
      createProps
    );
    return shiftRecordShiftType;
  }

  async updateBulkShiftRecordShiftType(
    props: UpdateBulkShiftRecordShiftTypeProps
  ) {
    // Delete all the existing entries for the given shift
    await this.deleteBulkShiftRecordShiftType({ shift: props.shift });

    // Then assign the new types to the given shift
    const shiftRecordShiftType = await this.createBulkShiftRecordShiftType(
      props
    );
    return shiftRecordShiftType;
  }

  async deleteBulkShiftRecordShiftType(
    props: DeleteBulkShiftRecordShiftTypeProps
  ) {
    const { shift } = props;
    await ShiftRecordShiftTypeModel.destroy({
      where: {
        shift,
      },
    });
  }
}

export default new ShiftRecordShiftTypeService();
