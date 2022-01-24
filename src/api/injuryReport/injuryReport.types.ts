import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface InjuryReport extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  description: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateInjuryReportProps {
  date: InjuryReport["date"];
  time: InjuryReport["time"];
  description: InjuryReport["description"];
  staff: InjuryReport["staff"];
  client: InjuryReport["client"];
  company: InjuryReport["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateInjuryReportProps extends CreateInjuryReportProps {
  id: InjuryReport["id"];
}

export interface DeleteInjuryReportProps {
  id: InjuryReport["id"];
  company: InjuryReport["company"];
}

export interface GetInjuryReportByIdProps extends DeleteInjuryReportProps {}

export interface GetInjuryReportsProps extends QueryParams {
  company: InjuryReport["company"];
}
