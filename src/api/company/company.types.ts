import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface Company extends DefaultSchemaConfig {
  name: string;
}

export type CreateCompanyProps = Pick<Company, "name">;

export type UpdateCompanyProps = Pick<Company, "name">;
