import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface User extends DefaultSchemaConfig {
  fullName: string;
  email: string;
  password: string;
}

export type CreateUserProps = Pick<User, "fullName" | "email" | "password">;

export type UpdateUserProps = Pick<User, "fullName" | "email">;
