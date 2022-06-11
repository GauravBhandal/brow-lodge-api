import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ParticipantCommunicationLog } from "..";
import { Attachment } from "../../attachment";

export interface ParticipantCommunicationLogAttachment
  extends DefaultSchemaConfig {
  relation: ParticipantCommunicationLog["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkParticipantCommunicationLogAttachmentProps {
  relation: ParticipantCommunicationLogAttachment["relation"];
  attachments: ParticipantCommunicationLogAttachment["attachment"][];
}

export interface UpdateBulkParticipantCommunicationLogAttachmentProps
  extends CreateBulkParticipantCommunicationLogAttachmentProps {}

export interface DeleteBulkParticipantCommunicationLogAttachmentProps {
  relation: ParticipantCommunicationLogAttachment["relation"];
}
