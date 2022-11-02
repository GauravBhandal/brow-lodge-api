import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { ShiftRepeat } from "../shiftRepeat";
import { Service } from "../service";
import { ServiceProp } from "./shiftRecordService";
import { User } from "../user";

export interface ShiftRecord extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime: Date;
  break?: Number;
  Staff?: StaffProfile[];
  Client?: ClientProfile[];
  user: User["id"];
  company: Company["id"];
  Company?: Company;
  Services?: Service[];
  repeat?: ShiftRepeat["id"];
  status?: String;
  claimType?: string;
}

export interface CreateShiftRecordProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  break: ShiftRecord["break"];
  staff: StaffProfile["id"][];
  client: ClientProfile["id"][];
  company: ShiftRecord["company"];
  services: ServiceProp[];
  status: ShiftRecord["status"];
  claimType: ShiftRecord["claimType"];
}

export interface CreateShiftRecordInBulkHelperProps {
  startDateTime: ShiftRecord["startDateTime"];
  endDateTime: ShiftRecord["endDateTime"];
  break: ShiftRecord["break"];
  staff: StaffProfile["id"][];
  client: ClientProfile["id"][];
  company: ShiftRecord["company"];
  services: ServiceProp[];
  repeat: any; // TODO: Remove any
  status: ShiftRecord["status"];
  timezone?: string;
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
  status: ShiftRecord["status"];
}

export interface UpdateShiftRecordProps extends CreateShiftRecordProps {
  id: ShiftRecord["id"];
  updateRecurring?: Boolean;
}

export interface DeleteShiftRecordProps {
  id: ShiftRecord["id"];
  company: ShiftRecord["company"];
  deleteRecurring?: Boolean;
}

export interface GetShiftRecordByIdProps extends DeleteShiftRecordProps { }

export interface GetShiftRecordsProps extends QueryParams {
  company: ShiftRecord["company"];
}
export interface GetMyShiftRecordsProps extends QueryParams {
  company: ShiftRecord["company"];
  user: ShiftRecord["id"];
}

export interface PublishShiftRecordsProps {
  shiftIds: ShiftRecord["id"][];
  company: ShiftRecord["company"];
  status: ShiftRecord["status"];
}
