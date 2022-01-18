import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface PrnBalanceLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  name: string;
  balance: number;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreatePrnBalanceLogProps {
  date: PrnBalanceLog["date"];
  time: PrnBalanceLog["time"];
  name: PrnBalanceLog["name"];
  balance: PrnBalanceLog["balance"];
  staff: PrnBalanceLog["staff"];
  client: PrnBalanceLog["client"];
  company: PrnBalanceLog["company"];
}

export interface UpdatePrnBalanceLogProps extends CreatePrnBalanceLogProps {
  id: PrnBalanceLog["id"];
}

export interface DeletePrnBalanceLogProps {
  id: PrnBalanceLog["id"];
  company: PrnBalanceLog["company"];
}

export interface GetPrnBalanceLogByIdProps extends DeletePrnBalanceLogProps {}

export interface GetPrnBalanceLogsProps extends QueryParams {
  company: PrnBalanceLog["company"];
}
