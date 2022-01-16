import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { Role } from "../role";
import { QueryParams } from "../../common/types";

export interface User extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  blocked: boolean;
  company: Company["id"];
  Company?: Company;
  Roles?: Role[];
}

export interface RegisterUserProps {
  companyName: Company["name"];
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  password: User["password"];
}

export interface LoginUserProps {
  email: User["email"];
  password: User["password"];
}

export interface CreateUserProps {
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  password: User["password"];
  blocked: User["blocked"];
  company: User["company"];
  roles?: Role["id"][];
}

export interface UpdateUserProps extends CreateUserProps {
  userId: User["id"];
}

export interface DeleteUserProps {
  userId: User["id"];
  company: Company["id"];
}

export interface GetUserByIdProps extends DeleteUserProps {}

export interface GetUsersProps extends QueryParams {
  company: Company["id"];
}
