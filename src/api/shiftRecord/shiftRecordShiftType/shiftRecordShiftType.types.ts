import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ShiftRecord } from "..";
import { ShiftType } from "../../shiftType";

interface TypeProp {
  type: ShiftType["id"];
  startTime: Date;
}

export interface ShiftRecordShiftType extends DefaultSchemaConfig {
  shift: ShiftRecord["id"];
  type: ShiftType["id"];
  startTime: Date;
}

export interface CreateBulkShiftRecordShiftTypeProps {
  shift: ShiftRecordShiftType["shift"];
  types: TypeProp[];
}

export interface UpdateBulkShiftRecordShiftTypeProps
  extends CreateBulkShiftRecordShiftTypeProps {}

export interface DeleteBulkShiftRecordShiftTypeProps {
  shift: ShiftRecordShiftType["shift"];
}
