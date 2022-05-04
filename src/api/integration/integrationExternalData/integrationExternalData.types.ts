import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Company } from "../../company";
import { Integration } from "../index";

export interface IntegrationExternalData extends DefaultSchemaConfig {
  type: string;
  data: Record<string, any>;
  company: Company["id"];
  Company?: Company;
  integration: Integration["id"];
  Integration?: Integration;
}

export interface CreateIntegrationExternalDataProps {
  type: IntegrationExternalData["type"];
  data: IntegrationExternalData["data"];
  company: IntegrationExternalData["company"];
  integration: IntegrationExternalData["integration"];
}

export interface CreateOrUpdateIntegrationExternalDataProps {
  data: IntegrationExternalData["data"];
  type: IntegrationExternalData["type"];
  company: IntegrationExternalData["company"];
  integration: IntegrationExternalData["integration"];
}

export interface DeleteIntegrationExternalDataProps {
  data: IntegrationExternalData["data"];
  type: IntegrationExternalData["type"];
  company: IntegrationExternalData["company"];
  integration: IntegrationExternalData["integration"];
}

export interface GetIntegrationExternalDataProps
  extends DeleteIntegrationExternalDataProps {}
