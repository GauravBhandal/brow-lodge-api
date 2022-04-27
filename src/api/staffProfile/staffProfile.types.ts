import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { User } from "../user";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";
import { PayLevel } from "../payLevel";

export interface StaffProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: Date;
  accountingCode?: string;
  personalContactNumber?: string;
  workContactNumber?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  jobTitle?: string;
  employmentStartDate?: Date;
  employmentEndDate?: Date;
  employmentType?: string;
  manager?: StaffProfile["id"];
  archived?: boolean;
  user?: User["id"];
  User?: User;
  company: Company["id"];
  Company?: Company;
  attachment?: Attachment["id"];
  Paylevel?: PayLevel[];
}

export interface CreateStaffProfileProps {
  firstName: StaffProfile["firstName"];
  lastName: StaffProfile["lastName"];
  preferredName: StaffProfile["preferredName"];
  email: StaffProfile["email"];
  gender?: StaffProfile["gender"];
  accountingCode?: StaffProfile["accountingCode"];
  dateOfBirth?: StaffProfile["dateOfBirth"];
  personalContactNumber?: StaffProfile["personalContactNumber"];
  workContactNumber?: StaffProfile["workContactNumber"];
  address?: StaffProfile["address"];
  emergencyContactName?: StaffProfile["emergencyContactName"];
  emergencyContactPhone?: StaffProfile["emergencyContactPhone"];
  emergencyContactRelation?: StaffProfile["emergencyContactRelation"];
  jobTitle?: StaffProfile["jobTitle"];
  employmentStartDate?: StaffProfile["employmentStartDate"];
  employmentEndDate?: StaffProfile["employmentEndDate"];
  employmentType?: StaffProfile["employmentType"];
  manager?: StaffProfile["manager"];
  user: StaffProfile["user"];
  company: StaffProfile["company"];
  attachment?: StaffProfile["attachment"];
  paylevel?: PayLevel["id"][];
}

export interface UpdateStaffProfileProps extends CreateStaffProfileProps {
  id: StaffProfile["id"];
}

export interface DeleteStaffProfileProps {
  id: StaffProfile["id"];
  company: StaffProfile["company"];
}

export interface GetStaffProfileByIdProps extends DeleteStaffProfileProps {}

export interface GetStaffProfilesProps extends QueryParams {
  company: StaffProfile["company"];
}
