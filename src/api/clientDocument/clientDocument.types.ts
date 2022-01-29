import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { ClientDocumentCategory } from "../clientDocumentCategory";
import { ClientDocumentType } from "../clientDocumentType";
import { ClientProfile } from "../clientProfile";
import { Attachment } from "../attachment";

export interface ClientDocument extends DefaultSchemaConfig {
  comments?: string;
  hasExpiry: boolean;
  expiryDate?: Date;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  category: ClientDocumentCategory["id"];
  Category?: ClientDocumentCategory;
  type: ClientDocumentType["id"];
  Type?: ClientDocumentType;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateClientDocumentProps {
  comments: ClientDocument["comments"];
  hasExpiry: ClientDocument["hasExpiry"];
  expiryDate: ClientDocument["expiryDate"];
  client: ClientDocument["client"];
  category: ClientDocument["category"];
  type: ClientDocument["type"];
  company: ClientDocument["company"];
  attachments: Attachment["id"][];
}

export interface UpdateClientDocumentProps extends CreateClientDocumentProps {
  id: ClientDocument["id"];
}

export interface DeleteClientDocumentProps {
  id: ClientDocument["id"];
  company: ClientDocument["company"];
}

export interface GetClientDocumentByIdProps extends DeleteClientDocumentProps {}

export interface GetClientDocumentsProps extends QueryParams {
  company: ClientDocument["company"];
}