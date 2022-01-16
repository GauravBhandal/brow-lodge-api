import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface Role extends DefaultSchemaConfig {
  name: string;
  description?: string;
  permissions?: Record<string, object>;
  company: Company["id"];
  Company?: Company;
}

export interface CreateRoleProps {
  name: Role["name"];
  description?: Role["description"];
  permissions?: Role["permissions"];
  company: Company["id"];
}

export interface UpdateRoleProps extends CreateRoleProps {
  roleId: Role["id"];
}

export interface DeleteRoleProps {
  roleId: Role["id"];
  company: Company["id"];
}

export interface GetRoleByIdProps extends DeleteRoleProps {}

export interface GetRolesProps extends QueryParams {
  company: Company["id"];
}
