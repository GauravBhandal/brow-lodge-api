import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface WeightLog extends DefaultSchemaConfig {
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

export interface CreateWeightLogProps {
  date: WeightLog["date"];
  time: WeightLog["time"];
  reading: WeightLog["reading"];
  comments: WeightLog["comments"];
  staff: WeightLog["staff"];
  client: WeightLog["client"];
  company: WeightLog["company"];
}

export interface UpdateWeightLogProps extends CreateWeightLogProps {
  id: WeightLog["id"];
}

export interface DeleteWeightLogProps {
  id: WeightLog["id"];
  company: WeightLog["company"];
}

export interface GetWeightLogByIdProps extends DeleteWeightLogProps {}

export interface GetWeightLogsProps extends QueryParams {
  company: WeightLog["company"];
}
