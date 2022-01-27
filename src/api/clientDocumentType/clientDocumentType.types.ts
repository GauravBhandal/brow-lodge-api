import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { ClientDocumentCategory } from "../clientDocumentCategory";

export interface ClientDocumentType extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
  category: ClientDocumentCategory["id"];
  Category?: ClientDocumentCategory;
}

export interface CreateClientDocumentTypeProps {
  name: ClientDocumentType["name"];
  company: ClientDocumentType["company"];
  category: ClientDocumentType["category"];
}

export interface UpdateClientDocumentTypeProps
  extends CreateClientDocumentTypeProps {
  id: ClientDocumentType["id"];
}

export interface DeleteClientDocumentTypeProps {
  id: ClientDocumentType["id"];
  company: ClientDocumentType["company"];
}

export interface GetClientDocumentTypeByIdProps
  extends DeleteClientDocumentTypeProps {}

export interface GetClientDocumentTypesProps extends QueryParams {
  company: ClientDocumentType["company"];
}
