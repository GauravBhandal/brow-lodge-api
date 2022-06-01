import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface OnCallLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  duration: string;
  communicationWith: string;
  description: string;
  actions?: string;
  followup?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client?: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateOnCallLogProps {
  date: OnCallLog["date"];
  time: OnCallLog["time"];
  duration: OnCallLog["duration"];
  communicationWith: OnCallLog["communicationWith"];
  description: OnCallLog["description"];
  actions: OnCallLog["actions"];
  followup: OnCallLog["followup"];
  staff: OnCallLog["staff"];
  client: OnCallLog["client"];
  company: OnCallLog["company"];
}

export interface UpdateOnCallLogProps extends CreateOnCallLogProps {
  id: OnCallLog["id"];
}

export interface DeleteOnCallLogProps {
  id: OnCallLog["id"];
  company: OnCallLog["company"];
}

export interface GetOnCallLogByIdProps extends DeleteOnCallLogProps {}

export interface GetOnCallLogsProps extends QueryParams {
  company: OnCallLog["company"];
}
