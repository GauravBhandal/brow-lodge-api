import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface BloodGlucoseLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  reading: Number;
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreateBloodGlucoseLogProps {
  date: BloodGlucoseLog["date"];
  time: BloodGlucoseLog["time"];
  reading: BloodGlucoseLog["reading"];
  comments: BloodGlucoseLog["comments"];
  staff: BloodGlucoseLog["staff"];
  client: BloodGlucoseLog["client"];
  company: BloodGlucoseLog["company"];
}

export interface UpdateBloodGlucoseLogProps extends CreateBloodGlucoseLogProps {
  id: BloodGlucoseLog["id"];
}

export interface DeleteBloodGlucoseLogProps {
  id: BloodGlucoseLog["id"];
  company: BloodGlucoseLog["company"];
}

export interface GetBloodGlucoseLogByIdProps
  extends DeleteBloodGlucoseLogProps {}

export interface GetBloodGlucoseLogsProps extends QueryParams {
  company: BloodGlucoseLog["company"];
}
