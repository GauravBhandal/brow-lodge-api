import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface Company extends DefaultSchemaConfig {
  name: string;
}

export interface CreateCompanyProps {
  name: Company["name"];
}

export interface UpdateCompanyProps extends CreateCompanyProps {
  companyId: Company["id"];
  company: Company["id"];
}

export interface GetCompanyByIdProps {
  companyId: Company["id"];
  company: Company["id"];
}
