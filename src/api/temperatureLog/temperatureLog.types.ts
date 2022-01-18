import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface TemperatureLog extends DefaultSchemaConfig {
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
}

export interface CreateTemperatureLogProps {
  date: TemperatureLog["date"];
  time: TemperatureLog["time"];
  reading: TemperatureLog["reading"];
  comments: TemperatureLog["comments"];
  staff: TemperatureLog["staff"];
  client: TemperatureLog["client"];
  company: TemperatureLog["company"];
}

export interface UpdateTemperatureLogProps extends CreateTemperatureLogProps {
  id: TemperatureLog["id"];
}

export interface DeleteTemperatureLogProps {
  id: TemperatureLog["id"];
  company: TemperatureLog["company"];
}

export interface GetTemperatureLogByIdProps extends DeleteTemperatureLogProps {}

export interface GetTemperatureLogsProps extends QueryParams {
  company: TemperatureLog["company"];
}
