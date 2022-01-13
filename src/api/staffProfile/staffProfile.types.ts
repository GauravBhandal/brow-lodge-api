import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface StaffProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
}

export type CreateStaffProfileProps = Pick<
  StaffProfile,
  "firstName" | "lastName"
>;

export type UpdateStaffProfileProps = Pick<
  StaffProfile,
  "firstName" | "lastName"
>;
