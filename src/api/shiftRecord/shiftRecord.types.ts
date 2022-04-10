import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { ShiftType } from "../shiftType";
import { TypeProp } from "./shiftRecordShiftType";
import { ShiftRepeat } from "../shiftRepeat";

export interface ShiftRecord extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime: Date;
  Staff?: StaffProfile[];
  Client?: ClientProfile[];
  company: Company["id"];
  Company?: Company;
  Types?: ShiftType[];
  repeat?: ShiftRepeat["id"];
}

export interface CreateShiftRecordProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  staff: StaffProfile["id"][];
  client: ClientProfile["id"][];
  company: ShiftRecord["company"];
  types: TypeProp[];
}

export interface CreateShiftRecordInBulkProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  staff: StaffProfile["id"][];
  client: ClientProfile["id"][];
  company: ShiftRecord["company"];
  types: TypeProp[];
  repeat: any; // TODO: Remove any
}

export interface UpdateShiftRecordProps extends CreateShiftRecordProps {
  id: ShiftRecord["id"];
}

export interface DeleteShiftRecordProps {
  id: ShiftRecord["id"];
  company: ShiftRecord["company"];
  deleteRecurring?: Boolean;
}

export interface GetShiftRecordByIdProps extends DeleteShiftRecordProps {}

export interface GetShiftRecordsProps extends QueryParams {
  company: ShiftRecord["company"];
}
