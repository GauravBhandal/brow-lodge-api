import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { ClientProfile } from "../clientProfile";

export interface WaxConsultation extends DefaultSchemaConfig {
  doctorName: string;
  technicianName: string;
  doctorAddress: string;
  clientSign?: string;
  waxTreatment: boolean;
  prescribedMedicine?: string,
  containProducts?: string[];
  disease?: string[];
  date: Date;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateWaxConsultationProps {
  doctorName: WaxConsultation["doctorName"];
  technicianName: WaxConsultation["technicianName"];
  doctorAddress: WaxConsultation["doctorAddress"];
  clientSign: WaxConsultation["clientSign"];
  prescribedMedicine: WaxConsultation["prescribedMedicine"];
  waxTreatment: WaxConsultation["waxTreatment"];
  containProducts: WaxConsultation["containProducts"];
  disease: WaxConsultation["disease"];
  date: WaxConsultation["date"];
  client: WaxConsultation["client"];
  company: WaxConsultation["company"];
}

export interface UpdateWaxConsultationProps
  extends CreateWaxConsultationProps {
  id: WaxConsultation["id"];
}

export interface DeleteWaxConsultationProps {
  id: WaxConsultation["id"];
  company: WaxConsultation["company"];
}

export interface GetWaxConsultationByIdProps
  extends DeleteWaxConsultationProps {}

export interface GetWaxConsultationsProps extends QueryParams {
  company: WaxConsultation["company"];
}
