import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { User } from "../user";
import { Role } from "../role";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface StaffProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: Date;
  personalContactNumber?: string;
  address?: string;
  jobTitle?: string;
  employmentStartDate?: Date;
  employmentEndDate?: Date;
  archived?: boolean;
  user?: User["id"];
  User?: User;
  company: Company["id"];
  Company?: Company;
  attachment?: Attachment["id"];
}

export interface CreateStaffProfileProps {
  firstName: StaffProfile["firstName"];
  lastName: StaffProfile["lastName"];
  preferredName: StaffProfile["preferredName"];
  email: StaffProfile["email"];
  password: User["password"];
  blocked: User["blocked"];
  company: User["company"];
  roles?: Role["id"][];
}

export interface UpdateStaffProfileProps extends CreateStaffProfileProps {
  id: StaffProfile["id"];
}

export interface DeleteStaffProfileProps {
  id: StaffProfile["id"];
  company: StaffProfile["company"];
}

export interface GetStaffProfileByUserProps {
  user: StaffProfile["user"];
  company: StaffProfile["company"];
}

export interface GetStaffProfileByIdProps extends DeleteStaffProfileProps {}

export interface GetStaffProfilesProps extends QueryParams {
  company: StaffProfile["company"];
}

export interface GetAllStaffProfilesProps {
  company: StaffProfile["company"];
}
