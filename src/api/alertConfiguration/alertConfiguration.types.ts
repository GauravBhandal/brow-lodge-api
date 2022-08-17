import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface AlertConfiguration extends DefaultSchemaConfig {
  name: string;
  transport?: Record<string, any>; // TODO: Remove this any
  company: Company["id"];
  Company?: Company;
}

export interface CreateAlertConfigurationProps {
  name: AlertConfiguration["name"];
  transport?: AlertConfiguration["transport"];
  company: AlertConfiguration["company"];
}

export interface UpdateAlertConfigurationProps {
  company: AlertConfiguration["company"];
  payload: CreateAlertConfigurationProps[];
}

export interface DeleteAlertConfigurationProps {
  company: AlertConfiguration["company"];
}

export interface GetAlertConfigurationsProps {
  company: AlertConfiguration["company"];
}
