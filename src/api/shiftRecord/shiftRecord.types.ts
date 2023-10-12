import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Site } from "../site";
import { StaffProfile } from "../staffProfile";

export interface ShiftRecord extends DefaultSchemaConfig {
  date: Date;
  site?: Site["id"];
  Site?: Site;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateShiftRecordProps {
  date: ShiftRecord["date"];
  site?: ShiftRecord["site"];
  staff: ShiftRecord["staff"];
  company: ShiftRecord["company"];
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
