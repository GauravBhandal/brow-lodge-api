import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface StaffProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  company: Company["id"];
  Company?: Company;
}

export type CreateStaffProfileProps = Pick<
  StaffProfile,
  "firstName" | "lastName"
>;

export type UpdateStaffProfileProps = Pick<
  StaffProfile,
  "firstName" | "lastName"
>;
