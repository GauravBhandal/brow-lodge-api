import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { ShiftRecord } from "../shiftRecord";

export interface Timesheet extends DefaultSchemaConfig {
  lastExportedOn: Date;
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

export interface CreateTimesheetProps {
  startDateTime: Timesheet["startDateTime"];
  endDateTime: Timesheet["endDateTime"];
  status: Timesheet["status"];
  shift: Timesheet["shift"];
  staff: Timesheet["staff"][];
  company: Timesheet["company"];
}

export interface UpdateTimesheetProps {
  id: Timesheet["id"];
  startDateTime: Timesheet["startDateTime"];
  endDateTime: Timesheet["endDateTime"];
  status: Timesheet["status"];
  shift: Timesheet["shift"];
  staff: Timesheet["staff"];
  company: Timesheet["company"];
}
export interface UpdateTimesheetStatusProps {
  ids: Timesheet["id"][];
  status: Timesheet["status"];
  company: Timesheet["company"];
  lastExportedOn: Timesheet["lastExportedOn"];
}

export interface GenerateTimesheetsProps {
  ids: Timesheet["id"][];
  company: Timesheet["company"];
}
export interface UpdateTimesheetOnShiftUpdateProps {
  startDateTime: Timesheet["startDateTime"];
  endDateTime: Timesheet["endDateTime"];
  shift: Timesheet["shift"];
  staff: Timesheet["staff"][];
  company: Timesheet["company"];
}

export interface DeleteTimesheetProps {
  shift: Timesheet["shift"];
  company: Timesheet["company"];
}

export interface GetTimesheetByIdProps {
  id: Timesheet["id"];
  company: Timesheet["company"];
}

export interface GetTimesheetsProps extends QueryParams {
  company: Timesheet["company"];
}
