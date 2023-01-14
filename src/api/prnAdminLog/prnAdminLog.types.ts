import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface PrnAdminLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  medication: string;
  dosage: string;
  reason: string;
  outcome: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreatePrnAdminLogProps {
  date: PrnAdminLog["date"];
  time: PrnAdminLog["time"];
  medication: PrnAdminLog["medication"];
  dosage: PrnAdminLog["dosage"];
  reason: PrnAdminLog["reason"];
  outcome: PrnAdminLog["outcome"];
  staff: PrnAdminLog["staff"];
  client: PrnAdminLog["client"];
  company: PrnAdminLog["company"];
}

export interface UpdatePrnAdminLogProps extends CreatePrnAdminLogProps {
  id: PrnAdminLog["id"];
}

export interface DeletePrnAdminLogProps {
  id: PrnAdminLog["id"];
  company: PrnAdminLog["company"];
}

export interface GetPrnAdminLogByIdProps extends DeletePrnAdminLogProps {}

export interface GetPrnAdminLogsProps extends QueryParams {
  company: PrnAdminLog["company"];
}
