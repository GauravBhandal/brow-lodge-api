import ShiftRecordServiceModel from "./shiftRecordService.model";
import {
  CreateBulkShiftRecordServiceProps,
  UpdateBulkShiftRecordServiceProps,
  DeleteBulkShiftRecordServiceProps,
} from "./shiftRecordService.types";

class ShiftRecordServiceService {
  async createBulkShiftRecordService(props: CreateBulkShiftRecordServiceProps) {
    const createProps = props.services.map((shiftService) => ({
      shift: props.shift,
      service: shiftService.service,
      startTime: shiftService.startTime,
    }));

    const shiftRecordService = await ShiftRecordServiceModel.bulkCreate(
      createProps
    );
    return shiftRecordService;
  }

  async updateBulkShiftRecordService(props: UpdateBulkShiftRecordServiceProps) {
    // Delete all the existing entries for the given shift
    await this.deleteBulkShiftRecordService({ shift: props.shift });

    // Then assign the new services to the given shift
    const shiftRecordService = await this.createBulkShiftRecordService(props);
    return shiftRecordService;
  }

  async deleteBulkShiftRecordService(props: DeleteBulkShiftRecordServiceProps) {
    const { shift } = props;
    await ShiftRecordServiceModel.destroy({
      where: {
        shift,
      },
    });
  }
}

export default new ShiftRecordServiceService();
