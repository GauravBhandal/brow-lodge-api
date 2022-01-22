import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface DocumentLog extends DefaultSchemaConfig {
  name: string;
  url: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateDocumentLogProps {
  file?: Express.Multer.File;
  company: DocumentLog["company"];
}

export interface DeleteDocumentLogProps {
  id: DocumentLog["id"];
  company: DocumentLog["company"];
}

export interface GetDocumentLogByIdProps extends DeleteDocumentLogProps {}
