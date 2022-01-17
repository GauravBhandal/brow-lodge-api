import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface Company extends DefaultSchemaConfig {
  name: string;
}

export interface CreateCompanyProps {
  name: Company["name"];
}

export interface UpdateCompanyProps extends CreateCompanyProps {
  id: Company["id"];
  company: Company["id"];
}

export interface GetCompanyByIdProps {
  id: Company["id"];
  company: Company["id"];
}
