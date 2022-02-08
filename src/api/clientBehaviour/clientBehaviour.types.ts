import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface ClientBehaviour extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  antecedents: string;
  behaviour: string;
  consequences: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateClientBehaviourProps {
  date: ClientBehaviour["date"];
  startTime: ClientBehaviour["startTime"];
  endTime: ClientBehaviour["endTime"];
  antecedents: ClientBehaviour["antecedents"];
  behaviour: ClientBehaviour["behaviour"];
  consequences: ClientBehaviour["consequences"];
  staff: ClientBehaviour["staff"];
  client: ClientBehaviour["client"];
  company: ClientBehaviour["company"];
}

export interface UpdateClientBehaviourProps extends CreateClientBehaviourProps {
  id: ClientBehaviour["id"];
}

export interface DeleteClientBehaviourProps {
  id: ClientBehaviour["id"];
  company: ClientBehaviour["company"];
}

export interface GetClientBehaviourByIdProps
  extends DeleteClientBehaviourProps {}

export interface GetClientBehavioursProps extends QueryParams {
  company: ClientBehaviour["company"];
}
