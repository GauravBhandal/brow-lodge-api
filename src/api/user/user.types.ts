import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { Role } from "../role";

export interface User extends DefaultSchemaConfig {
  fullName: string;
  email: string;
  password: string;
  company: Company["id"];
  Company?: Company;
  Roles?: Role[];
}

export type LoginUserProps = Pick<User, "email" | "password">;

export type RegisterUserProps = Pick<
  User,
  "fullName" | "email" | "password"
> & { companyName: string };

export type CreateUserProps = Pick<
  User,
  "fullName" | "email" | "password" | "company"
> & { roles?: Role["id"][] };

export type UpdateUserProps = Pick<User, "fullName" | "email">;
