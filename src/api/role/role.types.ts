import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface Role extends DefaultSchemaConfig {
  name: string;
  description: string;
  permissions: Record<string, object>;
  company: Company["id"];
  Company?: Company;
}

export type CreateRoleProps = Pick<
  Role,
  "name" | "description" | "permissions"
>;

export type UpdateRoleProps = Pick<
  Role,
  "name" | "description" | "permissions"
>;
