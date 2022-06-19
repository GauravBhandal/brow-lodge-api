import ShiftRepeatModel from "./shiftRepeat.model";
import { CreateShiftRepeatProps } from "./shiftRepeat.types";

class ShiftRepeatService {
  async createShiftRepeat(props: CreateShiftRepeatProps) {
    // Create a new shift Repeat
    const shiftRepeat = await ShiftRepeatModel.create(props);

    return shiftRepeat;
  }
}

export default new ShiftRepeatService();
