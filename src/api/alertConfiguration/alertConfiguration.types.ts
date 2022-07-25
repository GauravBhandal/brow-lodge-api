import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface AlertConfiguration extends DefaultSchemaConfig {
  name: string;
  description?: string;
  permissions?: Record<string, any>; // TODO: Remove this any
  company: Company["id"];
  Company?: Company;
}

export interface CreateAlertConfigurationProps {
  name: AlertConfiguration["name"];
  description?: AlertConfiguration["description"];
  permissions?: AlertConfiguration["permissions"];
  company: AlertConfiguration["company"];
}

export interface UpdateAlertConfigurationProps extends CreateAlertConfigurationProps {
  id: AlertConfiguration["id"];
}

export interface DeleteAlertConfigurationProps {
  id: AlertConfiguration["id"];
  company: AlertConfiguration["company"];
}

export interface GetAlertConfigurationByIdProps extends DeleteAlertConfigurationProps {}

export interface GetAlertConfigurationsProps extends QueryParams {
  company: AlertConfiguration["company"];
}
