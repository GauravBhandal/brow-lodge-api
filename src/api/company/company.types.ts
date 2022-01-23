import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface Company extends DefaultSchemaConfig {
  name: string;
}

export interface CreateCompanyProps {
  name: Company["name"];
}

export interface UpdateMyCompanyProps extends CreateCompanyProps {
  company: Company["id"];
}

export interface GetMyCompanyProps {
  company: Company["id"];
}
