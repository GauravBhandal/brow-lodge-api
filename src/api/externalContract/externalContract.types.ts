import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ExternalContract extends DefaultSchemaConfig {
  date: Date;
  nextReviewDate?: Date;
  name: string;
  notes?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  Attachments: Attachment[];
}

export interface CreateExternalContractProps {
  date: ExternalContract["date"];
  nextReviewDate?: ExternalContract["nextReviewDate"];
  name: ExternalContract["name"];
  notes?: ExternalContract["notes"];
  staff: ExternalContract["staff"];
  company: ExternalContract["company"];
  attachments: Attachment["id"][];
}

export interface UpdateExternalContractProps
  extends CreateExternalContractProps {
  id: ExternalContract["id"];
}

export interface DeleteExternalContractProps {
  id: ExternalContract["id"];
  company: ExternalContract["company"];
}

export interface GetExternalContractByIdProps
  extends DeleteExternalContractProps {}

export interface GetExternalContractsProps extends QueryParams {
  company: ExternalContract["company"];
}
