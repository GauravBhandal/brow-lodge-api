import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface Process extends DefaultSchemaConfig {
  nextReviewDate?: Date;
  name: string;
  version: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateProcessProps {
  nextReviewDate?: Process["nextReviewDate"];
  name: Process["name"];
  version: Process["version"];
  company: Process["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateProcessProps extends CreateProcessProps {
  id: Process["id"];
}

export interface DeleteProcessProps {
  id: Process["id"];
  company: Process["company"];
}

export interface GetProcessByIdProps extends DeleteProcessProps {}

export interface GetProcessesProps extends QueryParams {
  company: Process["company"];
}
