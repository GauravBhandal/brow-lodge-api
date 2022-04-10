import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { ShiftRecord } from "../shiftRecord";

export interface TimeSheet extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime: Date;
  status: string;
  shift: ShiftRecord["id"];
  Shift?: ShiftRecord;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateTimeSheetProps {
  startDateTime: TimeSheet["startDateTime"];
  endDateTime: TimeSheet["endDateTime"];
  status: TimeSheet["status"];
  shift: TimeSheet["shift"];
  staff: TimeSheet["staff"][];
  company: TimeSheet["company"];
}

export interface UpdateTimeSheetProps {
  id: TimeSheet["id"];
  startDateTime: TimeSheet["startDateTime"];
  endDateTime: TimeSheet["endDateTime"];
  status: TimeSheet["status"];
  shift: TimeSheet["shift"];
  staff: TimeSheet["staff"];
  company: TimeSheet["company"];
}
export interface UpdateTimeSheetStatusProps {
  ids: TimeSheet["id"][];
  status: TimeSheet["status"];
  company: TimeSheet["company"];
}
export interface UpdateTimeSheetOnShiftUpdateProps {
  startDateTime: TimeSheet["startDateTime"];
  endDateTime: TimeSheet["endDateTime"];
  shift: TimeSheet["shift"];
  staff: TimeSheet["staff"][];
  company: TimeSheet["company"];
}

export interface DeleteTimeSheetProps {
  shift: TimeSheet["shift"];
  company: TimeSheet["company"];
}

export interface GetTimeSheetByIdProps {
  id: TimeSheet["id"];
  company: TimeSheet["company"];
}

export interface GetTimeSheetsProps extends QueryParams {
  company: TimeSheet["company"];
}
