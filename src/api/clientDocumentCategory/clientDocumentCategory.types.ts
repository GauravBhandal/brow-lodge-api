import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface ClientDocumentCategory extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateClientDocumentCategoryProps {
  name: ClientDocumentCategory["name"];
  company: ClientDocumentCategory["company"];
}

export interface UpdateClientDocumentCategoryProps
  extends CreateClientDocumentCategoryProps {
  id: ClientDocumentCategory["id"];
}

export interface DeleteClientDocumentCategoryProps {
  id: ClientDocumentCategory["id"];
  company: ClientDocumentCategory["company"];
}

export interface GetClientDocumentCategoryByIdProps
  extends DeleteClientDocumentCategoryProps {}

export interface GetClientDocumentCategorysProps extends QueryParams {
  company: ClientDocumentCategory["company"];
}
