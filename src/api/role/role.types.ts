import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface Role extends DefaultSchemaConfig {
  name: string;
  description: string;
  permissions: Record<string, object>;
}

export type CreateRoleProps = Pick<
  Role,
  "name" | "description" | "permissions"
>;

export type UpdateRoleProps = Pick<
  Role,
  "name" | "description" | "permissions"
>;
