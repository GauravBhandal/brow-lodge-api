import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { StaffDocument } from "..";
import { Attachment } from "../../attachment";

export interface StaffDocumentAttachment extends DefaultSchemaConfig {
  relation: StaffDocument["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkStaffDocumentAttachmentProps {
  relation: StaffDocumentAttachment["relation"];
  attachments: StaffDocumentAttachment["attachment"][];
}

export interface UpdateBulkStaffDocumentAttachmentProps
  extends CreateBulkStaffDocumentAttachmentProps {}

export interface DeleteBulkStaffDocumentAttachmentProps {
  relation: StaffDocumentAttachment["relation"];
}
