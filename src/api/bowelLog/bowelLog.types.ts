import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface BowelLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  status: string;
  type?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateBowelLogProps {
  date: BowelLog["date"];
  time: BowelLog["time"];
  status: BowelLog["status"];
  type: BowelLog["type"];
  staff: BowelLog["staff"];
  client: BowelLog["client"];
  company: BowelLog["company"];
}

export interface UpdateBowelLogProps extends CreateBowelLogProps {
  id: BowelLog["id"];
}

export interface DeleteBowelLogProps {
  id: BowelLog["id"];
  company: BowelLog["company"];
}

export interface GetBowelLogByIdProps extends DeleteBowelLogProps {}

export interface GetBowelLogsProps extends QueryParams {
  company: BowelLog["company"];
}
