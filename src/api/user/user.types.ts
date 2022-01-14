import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface User extends DefaultSchemaConfig {
  fullName: string;
  email: string;
  password: string;
  company: Company["id"];
  Company?: Company;
}

export type LoginUserProps = Pick<User, "email" | "password">;

export type CreateUserProps = Pick<User, "fullName" | "email" | "password">;

export type UpdateUserProps = Pick<User, "fullName" | "email">;
