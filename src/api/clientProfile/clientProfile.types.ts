import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ClientProfile extends DefaultSchemaConfig {
  firstName: string;
  lastName: string;
  preferredName: string;
  email?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: Date;
  personalContactNumber?: string;
  address?: string;
  archived?: boolean;
  company: Company["id"];
  Company?: Company;
  attachment?: Attachment["id"];
}

export interface CreateClientProfileProps {
  firstName: ClientProfile["firstName"];
  lastName: ClientProfile["lastName"];
  preferredName: ClientProfile["preferredName"];
  email: ClientProfile["email"];
  gender: ClientProfile["gender"];
  company: ClientProfile["company"];
  dateOfBirth: ClientProfile["dateOfBirth"];
  address: ClientProfile["address"];
  personalContactNumber: ClientProfile["personalContactNumber"];
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

export interface GetAllClientProfilesProps {
  company: ClientProfile["company"];
}
