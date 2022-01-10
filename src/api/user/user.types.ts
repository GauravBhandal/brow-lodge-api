import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Optional } from "sequelize/types";

export interface User extends DefaultSchemaConfig {
  fullName: string;
  email: string;
}

export type UserCreateModelProps = Optional<User, "id" | "created" | "updated">;
