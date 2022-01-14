import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface ClientProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  company: Company["id"];
  Company?: Company;
}

export type CreateClientProfileProps = Pick<
  ClientProfile,
  "firstName" | "lastName"
>;

export type UpdateClientProfileProps = Pick<
  ClientProfile,
  "firstName" | "lastName"
>;
