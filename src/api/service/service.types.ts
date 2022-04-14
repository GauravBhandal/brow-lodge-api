import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface Service extends DefaultSchemaConfig {
  code: string;
  name: string;
  effectiveDate?: Date;
  company: Company["id"];
  Company?: Company;
}

export interface CreateServiceProps {
  code: Service["code"];
  name: Service["name"];
  effectiveDate?: Service["effectiveDate"];
  company: Service["company"];
}

export interface UpdateServiceProps extends CreateServiceProps {
  id: Service["id"];
}

export interface DeleteServiceProps {
  id: Service["id"];
  company: Service["company"];
}

export interface GetServiceByIdProps extends DeleteServiceProps {}

export interface GetServicesProps extends QueryParams {
  company: Service["company"];
}
