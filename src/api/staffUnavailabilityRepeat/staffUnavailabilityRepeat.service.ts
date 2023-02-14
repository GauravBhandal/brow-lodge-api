import StaffUnavailabilityRepeatModel from "./staffUnavailabilityRepeat.model";
import { CreateStaffUnavailabilityRepeatProps } from "./staffUnavailabilityRepeat.types";

class StaffUnavailabilityRepeatService {
  async createStaffUnavailabilityRepeat(props: CreateStaffUnavailabilityRepeatProps) {
    // Create a new staff unavailability Repeat
    const staffUnavailabilityRepeat = await StaffUnavailabilityRepeatModel.create(props);

    return staffUnavailabilityRepeat;
  }
}

export default new StaffUnavailabilityRepeatService();
