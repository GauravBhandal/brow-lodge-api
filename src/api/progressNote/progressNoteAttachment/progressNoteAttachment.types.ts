import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ProgressNote } from "..";
import { Attachment } from "../../attachment";

export interface ProgressNoteAttachment extends DefaultSchemaConfig {
  relation: ProgressNote["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkProgressNoteAttachmentProps {
  relation: ProgressNoteAttachment["relation"];
  attachments: ProgressNoteAttachment["attachment"][];
}

export interface UpdateBulkProgressNoteAttachmentProps
  extends CreateBulkProgressNoteAttachmentProps {}

export interface DeleteBulkProgressNoteAttachmentProps {
  relation: ProgressNoteAttachment["relation"];
}
