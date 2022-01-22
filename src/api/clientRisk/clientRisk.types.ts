import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface ClientRisk extends DefaultSchemaConfig {
  date: Date;
  levelOfRisk: string;
  likelihood: string;
  consequences: string;
  riskDescription: string;
  mitigationStrategy: string;
  monitoringStrategy: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateClientRiskProps {
  date: ClientRisk["date"];
  levelOfRisk: ClientRisk["levelOfRisk"];
  likelihood: ClientRisk["likelihood"];
  consequences: ClientRisk["consequences"];
  riskDescription: ClientRisk["riskDescription"];
  mitigationStrategy: ClientRisk["mitigationStrategy"];
  monitoringStrategy: ClientRisk["monitoringStrategy"];
  staff: ClientRisk["staff"];
  client: ClientRisk["client"];
  company: ClientRisk["company"];
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
