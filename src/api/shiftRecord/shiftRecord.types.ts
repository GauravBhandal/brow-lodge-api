import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { ShiftRepeat } from "../shiftRepeat";
import { Service } from "../service";
import { ServiceProp } from "./shiftRecordService";

export interface ShiftRecord extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime: Date;
  break: Number;
  Staff?: StaffProfile[];
  Client?: ClientProfile[];
  company: Company["id"];
  Company?: Company;
  Services?: Service[];
  repeat?: ShiftRepeat["id"];
}

export interface CreateShiftRecordProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  break: ShiftRecord["break"];
  staff: StaffProfile["id"][];
  client: ClientProfile["id"][];
  company: ShiftRecord["company"];
  services: ServiceProp[];
}

export interface CreateShiftRecordInBulkProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  break: ShiftRecord["break"];
  staff: StaffProfile["id"][];
  client: ClientProfile["id"][];
  company: ShiftRecord["company"];
  services: ServiceProp[];
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
