import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { WaxConsultation } from "../waxConsultation";

export interface WaxConsultationDetail extends DefaultSchemaConfig {
  date: Date;
  therapist: string;
  skinBefore?: string;
  treatment?: string;
  skinAfter?: string;
  careGiven?: string;
  clientSign?: string;
  company: Company["id"];
  Company?: Company;
  wax: WaxConsultation["id"];
  Wax?: WaxConsultation;
}

export interface CreateBulkWaxConsultationDetailProps {
  date: WaxConsultationDetail["date"];
  therapist: WaxConsultationDetail["therapist"];
  skinBefore: WaxConsultationDetail["skinBefore"];
  treatment: WaxConsultationDetail["treatment"];
  skinAfter: WaxConsultationDetail["skinAfter"];
  careGiven: WaxConsultationDetail["careGiven"];
  clientSign: WaxConsultationDetail["clientSign"];
  wax: WaxConsultationDetail["wax"];
  company: WaxConsultationDetail["company"];
}

export interface CreateWaxConsultationDetailProps {
  date: WaxConsultationDetail["date"];
  therapist: WaxConsultationDetail["therapist"];
  skinBefore: WaxConsultationDetail["skinBefore"];
  treatment: WaxConsultationDetail["treatment"];
  skinAfter: WaxConsultationDetail["skinAfter"];
  careGiven: WaxConsultationDetail["careGiven"];
  clientSign: WaxConsultationDetail["clientSign"];
  wax: WaxConsultationDetail["wax"];
  company: WaxConsultationDetail["company"];
}

export interface UpdateWaxConsultationDetailProps
  extends CreateWaxConsultationDetailProps {
  id: WaxConsultationDetail["id"];
}

export interface DeleteWaxConsultationDetailProps {
  id: WaxConsultationDetail["id"];
  company: WaxConsultationDetail["company"];
}

export interface GetWaxConsultationDetailByIdProps
  extends DeleteWaxConsultationDetailProps {}

export interface GetWaxConsultationDetailsProps extends QueryParams {
  company: WaxConsultationDetail["company"];
}
