import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface BloodPressureLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  upper: Number;
  lower: Number;
  pulse: Number;
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreateBloodPressureLogProps {
  date: BloodPressureLog["date"];
  time: BloodPressureLog["time"];
  upper: BloodPressureLog["upper"];
  lower: BloodPressureLog["lower"];
  pulse: BloodPressureLog["pulse"];
  comments: BloodPressureLog["comments"];
  staff: BloodPressureLog["staff"];
  client: BloodPressureLog["client"];
  company: BloodPressureLog["company"];
}

export interface UpdateBloodPressureLogProps
  extends CreateBloodPressureLogProps {
  id: BloodPressureLog["id"];
}

export interface DeleteBloodPressureLogProps {
  id: BloodPressureLog["id"];
  company: BloodPressureLog["company"];
}

export interface GetBloodPressureLogByIdProps
  extends DeleteBloodPressureLogProps {}

export interface GetBloodPressureLogsProps extends QueryParams {
  company: BloodPressureLog["company"];
}
