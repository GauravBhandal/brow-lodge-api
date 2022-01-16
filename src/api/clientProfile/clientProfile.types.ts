import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface ClientProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  preferredName: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: Date;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  height?: number;
  company: Company["id"];
  Company?: Company;
}

export interface CreateClientProfileProps {
  firstName: ClientProfile["firstName"];
  lastName: ClientProfile["lastName"];
  preferredName: ClientProfile["preferredName"];
  gender: ClientProfile["gender"];
  dateOfBirth: ClientProfile["dateOfBirth"];
  address: ClientProfile["address"];
  emergencyContactName: ClientProfile["emergencyContactName"];
  emergencyContactPhone: ClientProfile["emergencyContactPhone"];
  emergencyContactRelation: ClientProfile["emergencyContactRelation"];
  height: ClientProfile["height"];
  company: ClientProfile["company"];
}

export interface UpdateClientProfileProps extends CreateClientProfileProps {
  id: ClientProfile["id"];
}

export interface DeleteClientProfileProps {
  id: ClientProfile["id"];
  company: ClientProfile["company"];
}

export interface GetClientProfileByIdProps extends DeleteClientProfileProps {}

export interface GetClientProfilesProps extends QueryParams {
  company: ClientProfile["company"];
}
