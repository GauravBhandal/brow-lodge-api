import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface CorporateRisk extends DefaultSchemaConfig {
  date: Date;
  levelOfRisk: string;
  likelihood: string;
  consequences: string;
  riskDescription: string;
  mitigationStrategy: string;
  monitoringStrategy: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateCorporateRiskProps {
  date: CorporateRisk["date"];
  levelOfRisk: CorporateRisk["levelOfRisk"];
  likelihood: CorporateRisk["likelihood"];
  consequences: CorporateRisk["consequences"];
  riskDescription: CorporateRisk["riskDescription"];
  mitigationStrategy: CorporateRisk["mitigationStrategy"];
  monitoringStrategy: CorporateRisk["monitoringStrategy"];
  staff: CorporateRisk["staff"];
  company: CorporateRisk["company"];
}

export interface UpdateCorporateRiskProps extends CreateCorporateRiskProps {
  id: CorporateRisk["id"];
}

export interface DeleteCorporateRiskProps {
  id: CorporateRisk["id"];
  company: CorporateRisk["company"];
}

export interface GetCorporateRiskByIdProps extends DeleteCorporateRiskProps {}

export interface GetCorporateRisksProps extends QueryParams {
  company: CorporateRisk["company"];
}