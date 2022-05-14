import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

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
  meta: any;
  company: Integration["company"];
}

export interface UpdateIntegrationProps {
  key: Integration["key"];
  meta: any;
  company: Integration["company"];
}

export interface GetIntegrationBykeyProps {
  key: Integration["key"];
  company: Integration["company"];
}

export interface GetIntegrationStatusByKeyProps
  extends GetIntegrationBykeyProps {}

export interface DeleteIntegrationBykeyProps extends GetIntegrationBykeyProps {}
