import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface LeaseAndUtilityLog extends DefaultSchemaConfig {
  date: Date;
  documentName: string;
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client?: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateLeaseAndUtilityLogProps {
  date: LeaseAndUtilityLog["date"];
  documentName: LeaseAndUtilityLog["documentName"];
  comments: LeaseAndUtilityLog["comments"];
  staff: LeaseAndUtilityLog["staff"];
  client: LeaseAndUtilityLog["client"];
  company: LeaseAndUtilityLog["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateLeaseAndUtilityLogProps
  extends CreateLeaseAndUtilityLogProps {
  id: LeaseAndUtilityLog["id"];
}

export interface DeleteLeaseAndUtilityLogProps {
  id: LeaseAndUtilityLog["id"];
  company: LeaseAndUtilityLog["company"];
}

export interface GetLeaseAndUtilityLogByIdProps
  extends DeleteLeaseAndUtilityLogProps {}

export interface GetLeaseAndUtilityLogsProps extends QueryParams {
  company: LeaseAndUtilityLog["company"];
}
