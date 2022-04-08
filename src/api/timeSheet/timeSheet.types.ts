import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { ShiftRecord } from "../shiftRecord";

export interface TimeSheet extends DefaultSchemaConfig {
  startDateTime: Date;
  endDateTime: Date;
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
  shift: TimeSheet["shift"];
  staff: TimeSheet["staff"];
  company: TimeSheet["company"];
}

export interface UpdateTimeSheetProps extends CreateTimeSheetProps {
  id: TimeSheet["id"];
}

export interface DeleteTimeSheetProps {
  id: TimeSheet["id"];
  company: TimeSheet["company"];
}

export interface GetTimeSheetByIdProps extends DeleteTimeSheetProps {}

export interface GetTimeSheetsProps extends QueryParams {
  company: TimeSheet["company"];
}
