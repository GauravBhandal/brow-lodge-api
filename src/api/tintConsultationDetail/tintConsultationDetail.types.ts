import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { TintConsultation } from "../tintConsultation";

export interface TintConsultationDetail extends DefaultSchemaConfig {
  date: Date;
  therapist?: string;
  browColour?: string;
  lashColour?: string;
  overleafCondition?: string;
  careGiven?: string;
  clientSign?: string;
  company: Company["id"];
  Company?: Company;
  tint: TintConsultation["id"];
  Tint?: TintConsultation;
}

export interface CreateBulkTintConsultationDetailProps {
  date: TintConsultationDetail["date"];
  therapist: TintConsultationDetail["therapist"];
  browColour: TintConsultationDetail["browColour"];
  lashColour: TintConsultationDetail["lashColour"];
  overleafCondition: TintConsultationDetail["overleafCondition"];
  careGiven: TintConsultationDetail["careGiven"];
  clientSign: TintConsultationDetail["clientSign"];
  tint: TintConsultationDetail["tint"];
  company: TintConsultationDetail["company"];
}

export interface CreateTintConsultationDetailProps {
  date: TintConsultationDetail["date"];
  therapist: TintConsultationDetail["therapist"];
  browColour: TintConsultationDetail["browColour"];
  lashColour: TintConsultationDetail["lashColour"];
  overleafCondition: TintConsultationDetail["overleafCondition"];
  careGiven: TintConsultationDetail["careGiven"];
  clientSign: TintConsultationDetail["clientSign"];
  tint: TintConsultationDetail["tint"];
  company: TintConsultationDetail["company"];
}

export interface UpdateTintConsultationDetailProps
  extends CreateTintConsultationDetailProps {
  id: TintConsultationDetail["id"];
}

export interface DeleteTintConsultationDetailProps {
  id: TintConsultationDetail["id"];
  company: TintConsultationDetail["company"];
}

export interface GetTintConsultationDetailByIdProps
  extends DeleteTintConsultationDetailProps {}

export interface GetTintConsultationDetailsProps extends QueryParams {
  company: TintConsultationDetail["company"];
}
