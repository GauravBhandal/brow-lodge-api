import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { EyelashExtension } from "../eyelashExtension";

export interface EyelashExtensionDetail extends DefaultSchemaConfig {
  date: Date;
  therapist: string;
  clientSign: string;
  feedback?: string;
  eyeFeedback?: string;
  careFeedback?: string;
  company: Company["id"];
  Company?: Company;
  eyelash: EyelashExtension["id"];
  Eyelash?: EyelashExtension;
}

export interface CreateBulkEyelashExtensionDetailProps {
  date: EyelashExtensionDetail["date"];
  therapist: EyelashExtensionDetail["therapist"];
  clientSign: EyelashExtensionDetail["clientSign"];
  feedback: EyelashExtensionDetail["feedback"];
  eyeFeedback: EyelashExtensionDetail["eyeFeedback"];
  careFeedback: EyelashExtensionDetail["careFeedback"];
  eyelash: EyelashExtensionDetail["eyelash"];
  company: EyelashExtensionDetail["company"];
}

export interface CreateEyelashExtensionDetailProps {
  date: EyelashExtensionDetail["date"];
  therapist: EyelashExtensionDetail["therapist"];
  clientSign: EyelashExtensionDetail["clientSign"];
  feedback: EyelashExtensionDetail["feedback"];
  eyeFeedback: EyelashExtensionDetail["eyeFeedback"];
  careFeedback: EyelashExtensionDetail["careFeedback"];
  eyelash: EyelashExtensionDetail["eyelash"];
  company: EyelashExtensionDetail["company"];
}

export interface UpdateEyelashExtensionDetailProps
  extends CreateEyelashExtensionDetailProps {
  id: EyelashExtensionDetail["id"];
}

export interface DeleteEyelashExtensionDetailProps {
  id: EyelashExtensionDetail["id"];
  company: EyelashExtensionDetail["company"];
}

export interface GetEyelashExtensionDetailByIdProps
  extends DeleteEyelashExtensionDetailProps {}

export interface GetEyelashExtensionDetailsProps extends QueryParams {
  company: EyelashExtensionDetail["company"];
}
