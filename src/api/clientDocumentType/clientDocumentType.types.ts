import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface ClientDocumentType extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateClientDocumentTypeProps {
  name: ClientDocumentType["name"];
  company: ClientDocumentType["company"];
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
