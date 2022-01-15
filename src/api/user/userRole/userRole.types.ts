import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { User } from "../../user";
import { Role } from "../../role";

export interface UserRole extends DefaultSchemaConfig {
  user: User["id"];
  role: Role["id"];
}

export type CreateUserRoleProps = {
  user: UserRole["user"];
  roles: UserRole["role"][];
};
