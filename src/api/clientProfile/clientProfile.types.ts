import { DefaultSchemaConfig } from "../../components/sequelize/manager";

export interface ClientProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
}

export type CreateClientProfileProps = Pick<
  ClientProfile,
  "firstName" | "lastName"
>;

export type UpdateClientProfileProps = Pick<
  ClientProfile,
  "firstName" | "lastName"
>;
