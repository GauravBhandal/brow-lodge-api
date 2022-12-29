import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface LegislationRegister extends DefaultSchemaConfig {
  reviewedOn: Date;
  nextReviewDate?: Date;
  domain: string;
  legislativeReference: string;
  documentReference: string;
  monitoringMechanism: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateLegislationRegisterProps {
  reviewedOn: LegislationRegister["reviewedOn"];
  nextReviewDate?: LegislationRegister["nextReviewDate"];
  domain: LegislationRegister["domain"];
  legislativeReference: LegislationRegister["legislativeReference"];
  documentReference: LegislationRegister["documentReference"];
  monitoringMechanism: LegislationRegister["monitoringMechanism"];
  company: LegislationRegister["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateLegislationRegisterProps
  extends CreateLegislationRegisterProps {
  id: LegislationRegister["id"];
}

export interface DeleteLegislationRegisterProps {
  id: LegislationRegister["id"];
  company: LegislationRegister["company"];
}

export interface GetLegislationRegisterByIdProps
  extends DeleteLegislationRegisterProps {}

export interface GetLegislationRegistersProps extends QueryParams {
  company: LegislationRegister["company"];
}
