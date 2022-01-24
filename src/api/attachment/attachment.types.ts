import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface Attachment extends DefaultSchemaConfig {
  name: string;
  meme: string;
  url: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateAttachmentProps {
  file?: Express.Multer.File;
  company: Attachment["company"];
}

export interface DeleteAttachmentProps {
  id: Attachment["id"];
  company: Attachment["company"];
}

export interface GetAttachmentByIdProps extends DeleteAttachmentProps {}
