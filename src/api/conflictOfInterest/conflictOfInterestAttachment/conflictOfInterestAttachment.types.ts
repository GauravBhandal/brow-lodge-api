import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ConflictOfInterest } from "..";
import { Attachment } from "../../attachment";

export interface ConflictOfInterestAttachment extends DefaultSchemaConfig {
  relation: ConflictOfInterest["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkConflictOfInterestAttachmentProps {
  relation: ConflictOfInterestAttachment["relation"];
  attachments: ConflictOfInterestAttachment["attachment"][];
}

export interface UpdateBulkConflictOfInterestAttachmentProps
  extends CreateBulkConflictOfInterestAttachmentProps {}

export interface DeleteBulkConflictOfInterestAttachmentProps {
  relation: ConflictOfInterestAttachment["relation"];
}
