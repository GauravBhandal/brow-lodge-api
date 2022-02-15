import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { ShiftType } from "../shiftType";

export interface ShiftRecord extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime: Date;
  staff?: StaffProfile["id"];
  client?: ClientProfile["id"];
  company: Company["id"];
  Company?: Company;
  Types?: ShiftType[];
}

interface TypeProp {
  type: ShiftType["id"];
  startTime: Date;
}

export interface CreateShiftRecordProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  staff: ShiftRecord["staff"];
  client: ShiftRecord["client"];
  company: ShiftRecord["company"];
  types: TypeProp[];
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
