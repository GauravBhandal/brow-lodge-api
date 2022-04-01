import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { StaffProfile } from "../../staffProfile";
import { ShiftRecord } from "../shiftRecord.types";

export interface ShiftRecordStaffProfile extends DefaultSchemaConfig {
  shift: ShiftRecord["id"];
  staff: StaffProfile["id"];
}

export interface CreateBulkShiftRecordStaffProfileProps {
  shift: ShiftRecordStaffProfile["shift"];
  staff: ShiftRecordStaffProfile["staff"][];
}

export interface UpdateBulkShiftRecordStaffProfileProps
  extends CreateBulkShiftRecordStaffProfileProps {}

export interface DeleteBulkShiftRecordStaffProfileProps {
  shift: ShiftRecordStaffProfile["shift"];
}
