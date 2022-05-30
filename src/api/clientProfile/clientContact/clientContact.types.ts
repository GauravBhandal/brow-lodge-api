import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Company } from "../../company";
import { ClientProfile } from "../clientProfile.types";

export interface ClientContact extends DefaultSchemaConfig {
  name: string;
  type: string;
  email: string;
  address: string;
  phone: string;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateClientContactProps {
  name: ClientContact["name"];
  type: ClientContact["type"];
  email: ClientContact["email"];
  address: ClientContact["address"];
  phone: ClientContact["phone"];
  client: ClientContact["client"];
  company: ClientContact["company"];
}

export interface UpdateClientContactProps {
  client: ClientContact["client"];
  contacts: CreateClientContactProps[];
  company: ClientContact["company"];
}

export interface DeleteClientContactProps {
  client: ClientContact["client"];
  company: ClientContact["company"];
}
