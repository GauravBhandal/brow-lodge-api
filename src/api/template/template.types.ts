import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface Template extends DefaultSchemaConfig {
  notes?: string;
  name: string;
  type?: string;
  category?: string;
  version: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateTemplateProps {
  notes: Template["notes"];
  name: Template["name"];
  type: Template["type"];
  category: Template["category"];
  version: Template["version"];
  company: Template["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateTemplateProps extends CreateTemplateProps {
  id: Template["id"];
}

export interface DeleteTemplateProps {
  id: Template["id"];
  company: Template["company"];
}

export interface GetTemplateByIdProps extends DeleteTemplateProps {}

export interface GetTemplatesProps extends QueryParams {
  company: Template["company"];
}
