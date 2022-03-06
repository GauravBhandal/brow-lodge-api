import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { ShiftType } from "../shiftType";
import { TypeProp } from "./shiftRecordShiftType";

export interface ShiftRecord extends DefaultSchemaConfig {
  startDateTime: string;
  endDateTime: string;
  staff?: StaffProfile["id"];
  client?: ClientProfile["id"];
  company: Company["id"];
  Company?: Company;
  Types?: ShiftType[];
}

export interface CreateShiftRecordProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  staff: ShiftRecord["staff"];
  client: ShiftRecord["client"];
  company: ShiftRecord["company"];
  types: TypeProp[];
}

export interface CreateShiftRecordInBulkProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  staff: ShiftRecord["staff"];
  client: ShiftRecord["client"];
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
}

export interface GetShiftRecordByIdProps extends DeleteShiftRecordProps {}

export interface GetShiftRecordsProps extends QueryParams {
  company: ShiftRecord["company"];
}
