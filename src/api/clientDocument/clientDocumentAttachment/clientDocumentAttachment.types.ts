import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ClientDocument } from "..";
import { Attachment } from "../../attachment";

export interface ClientDocumentAttachment extends DefaultSchemaConfig {
  relation: ClientDocument["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkClientDocumentAttachmentProps {
  relation: ClientDocumentAttachment["relation"];
  attachments: ClientDocumentAttachment["attachment"][];
}

export interface UpdateBulkClientDocumentAttachmentProps
  extends CreateBulkClientDocumentAttachmentProps {}

export interface DeleteBulkClientDocumentAttachmentProps {
  relation: ClientDocumentAttachment["relation"];
}
