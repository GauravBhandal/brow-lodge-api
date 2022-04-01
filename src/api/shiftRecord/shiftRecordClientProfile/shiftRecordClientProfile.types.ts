import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ClientProfile } from "../../clientProfile";
import { ShiftRecord } from "../shiftRecord.types";

export interface ShiftRecordClientProfile extends DefaultSchemaConfig {
  shift: ShiftRecord["id"];
  client: ClientProfile["id"];
}

export interface CreateBulkShiftRecordClientProfileProps {
  shift: ShiftRecordClientProfile["shift"];
  client: ShiftRecordClientProfile["client"][];
}

export interface UpdateBulkShiftRecordClientProfileProps
  extends CreateBulkShiftRecordClientProfileProps {}

export interface DeleteBulkShiftRecordClientProfileProps {
  shift: ShiftRecordClientProfile["shift"];
}
