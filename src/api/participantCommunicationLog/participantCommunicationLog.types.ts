import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ParticipantCommunicationLog extends DefaultSchemaConfig {
  date: Date;
  time: Date;
  communicationWith?: string;
  subject: string;
  description: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateParticipantCommunicationLogProps {
  date: ParticipantCommunicationLog["date"];
  time: ParticipantCommunicationLog["time"];
  communicationWith: ParticipantCommunicationLog["communicationWith"];
  subject: ParticipantCommunicationLog["subject"];
  description: ParticipantCommunicationLog["description"];
  staff: ParticipantCommunicationLog["staff"];
  client: ParticipantCommunicationLog["client"];
  company: ParticipantCommunicationLog["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateParticipantCommunicationLogProps
  extends CreateParticipantCommunicationLogProps {
  id: ParticipantCommunicationLog["id"];
}

export interface DeleteParticipantCommunicationLogProps {
  id: ParticipantCommunicationLog["id"];
  company: ParticipantCommunicationLog["company"];
}

export interface GetParticipantCommunicationLogByIdProps
  extends DeleteParticipantCommunicationLogProps {}

export interface GetParticipantCommunicationLogsProps extends QueryParams {
  company: ParticipantCommunicationLog["company"];
}
