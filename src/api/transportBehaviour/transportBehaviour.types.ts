import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface TransportBehaviour extends DefaultSchemaConfig {
  date: Date;
  startTime: Date;
  endTime: Date;
  purposeOfTheJourney: string;
  explainBehaviour: string;
  actionsTaken: string;
  responseToActions: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateTransportBehaviourProps {
  date: TransportBehaviour["date"];
  startTime: TransportBehaviour["startTime"];
  endTime: TransportBehaviour["endTime"];
  purposeOfTheJourney: TransportBehaviour["purposeOfTheJourney"];
  explainBehaviour: TransportBehaviour["explainBehaviour"];
  actionsTaken: TransportBehaviour["actionsTaken"];
  responseToActions: TransportBehaviour["responseToActions"];
  staff: TransportBehaviour["staff"];
  client: TransportBehaviour["client"];
  company: TransportBehaviour["company"];
}

export interface UpdateTransportBehaviourProps
  extends CreateTransportBehaviourProps {
  id: TransportBehaviour["id"];
}

export interface DeleteTransportBehaviourProps {
  id: TransportBehaviour["id"];
  company: TransportBehaviour["company"];
}

export interface GetTransportBehaviourByIdProps
  extends DeleteTransportBehaviourProps {}

export interface GetTransportBehavioursProps extends QueryParams {
  company: TransportBehaviour["company"];
}
