import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface User extends DefaultSchemaConfig {
  fullName: string;
  email: string;
}

export type CreateUserProps = Pick<User, "fullName" | "email">;

export type UpdateUserProps = Pick<User, "fullName" | "email">;
