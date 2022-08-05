import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ClientRisk extends DefaultSchemaConfig {
  date: Date;
  nextReviewDate?: Date;
  levelOfRisk: string;
  likelihood: string;
  consequences: string;
  riskDescription: string;
  mitigationStrategy: string;
  monitoringStrategy: string;
  assessmentType?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateClientRiskProps {
  date: ClientRisk["date"];
  nextReviewDate?: ClientRisk["nextReviewDate"];
  levelOfRisk: ClientRisk["levelOfRisk"];
  likelihood: ClientRisk["likelihood"];
  consequences: ClientRisk["consequences"];
  riskDescription: ClientRisk["riskDescription"];
  mitigationStrategy: ClientRisk["mitigationStrategy"];
  monitoringStrategy: ClientRisk["monitoringStrategy"];
  assessmentType: ClientRisk["assessmentType"];
  staff: ClientRisk["staff"];
  client: ClientRisk["client"];
  company: ClientRisk["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateClientRiskProps extends CreateClientRiskProps {
  id: ClientRisk["id"];
}

export interface DeleteClientRiskProps {
  id: ClientRisk["id"];
  company: ClientRisk["company"];
}

export interface GetClientRiskByIdProps extends DeleteClientRiskProps {}

export interface GetClientRisksProps extends QueryParams {
  company: ClientRisk["company"];
}
