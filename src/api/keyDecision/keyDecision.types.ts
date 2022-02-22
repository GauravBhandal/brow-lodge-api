import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface KeyDecision extends DefaultSchemaConfig {
  date: Date;
  description: string;
  decisionRationale: string;
  alternativesConsidered?: string;
  costImplications?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateKeyDecisionProps {
  date: KeyDecision["date"];
  description: KeyDecision["description"];
  decisionRationale: KeyDecision["decisionRationale"];
  alternativesConsidered: KeyDecision["alternativesConsidered"];
  costImplications: KeyDecision["costImplications"];
  staff: KeyDecision["staff"];
  company: KeyDecision["company"];
}

export interface UpdateKeyDecisionProps extends CreateKeyDecisionProps {
  id: KeyDecision["id"];
}

export interface DeleteKeyDecisionProps {
  id: KeyDecision["id"];
  company: KeyDecision["company"];
}

export interface GetKeyDecisionByIdProps extends DeleteKeyDecisionProps {}

export interface GetKeyDecisionsProps extends QueryParams {
  company: KeyDecision["company"];
}
