import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { ClientProfile } from "../clientProfile";

export interface TintConsultation extends DefaultSchemaConfig {
  doctorName?: string;
  technicianName: string;
  doctorAddress?: string;
  colourEyebrow?: string;
  colourEyelash?: string;
  clientSign?: string;
  skinPatchTestDate?: Date;
  skinPatchTest?: boolean;
  disease?: string[];
  date: Date;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateTintConsultationProps {
  doctorName: TintConsultation["doctorName"];
  technicianName: TintConsultation["technicianName"]
  doctorAddress: TintConsultation["doctorAddress"];
  clientSign: TintConsultation["clientSign"];
  colourEyebrow: TintConsultation["colourEyebrow"];
  colourEyelash: TintConsultation["colourEyelash"];
  skinPatchTestDate: TintConsultation["skinPatchTestDate"];
  skinPatchTest: TintConsultation["skinPatchTest"];
  disease: TintConsultation["disease"];
  date: TintConsultation["date"];
  client: TintConsultation["client"];
  company: TintConsultation["company"];
}

export interface UpdateTintConsultationProps
  extends CreateTintConsultationProps {
  id: TintConsultation["id"];
}

export interface DeleteTintConsultationProps {
  id: TintConsultation["id"];
  company: TintConsultation["company"];
}

export interface GetTintConsultationByIdProps
  extends DeleteTintConsultationProps {}

export interface GetTintConsultationsProps extends QueryParams {
  company: TintConsultation["company"];
}
