import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface SleepLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  activity: "sleep" | "awake" | "Unknown";
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreateSleepLogProps {
  date: SleepLog["date"];
  time: SleepLog["time"];
  activity: SleepLog["activity"];
  comments: SleepLog["comments"];
  staff: SleepLog["staff"];
  client: SleepLog["client"];
  company: SleepLog["company"];
}

export interface UpdateSleepLogProps extends CreateSleepLogProps {
  id: SleepLog["id"];
}

export interface DeleteSleepLogProps {
  id: SleepLog["id"];
  company: SleepLog["company"];
}

export interface GetSleepLogByIdProps extends DeleteSleepLogProps {}

export interface GetSleepLogsProps extends QueryParams {
  company: SleepLog["company"];
}
