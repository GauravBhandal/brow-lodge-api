import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface Integration extends DefaultSchemaConfig {
  name: string;
  key: string;
  meta: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateIntegrationProps {
  name: Integration["name"];
  key: Integration["key"];
  meta: Integration["meta"];
  company: Integration["company"];
}

export interface UpdateIntegrationProps {
  id: Integration["id"];
  name: Integration["name"];
  key: Integration["key"];
  meta: Integration["meta"];
  company: Integration["company"];
}

export interface DeleteIntegrationProps {
  id: Integration["id"];
  company: Integration["company"];
}

export interface GetIntegrationByIdProps {
  id: Integration["id"];
  company: Integration["company"];
}

export interface GetIntegrationsProps extends QueryParams {
  company: Integration["company"];
}
