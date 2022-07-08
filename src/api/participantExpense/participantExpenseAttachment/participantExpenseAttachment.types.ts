import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ParticipantExpense } from "../../participantExpense";
import { Attachment } from "../../attachment";

export interface ParticipantExpenseAttachment extends DefaultSchemaConfig {
  relation: ParticipantExpense["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkParticipantExpenseAttachmentProps {
  relation: ParticipantExpenseAttachment["relation"];
  attachments: ParticipantExpenseAttachment["attachment"][];
}

export interface UpdateBulkParticipantExpenseAttachmentProps
  extends CreateBulkParticipantExpenseAttachmentProps {}

export interface DeleteBulkParticipantExpenseAttachmentProps {
  relation: ParticipantExpenseAttachment["relation"];
}
