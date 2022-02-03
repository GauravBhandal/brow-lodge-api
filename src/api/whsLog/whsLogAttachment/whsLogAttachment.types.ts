import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { WhsLog } from "..";
import { Attachment } from "../../attachment";

export interface WhsLogAttachment extends DefaultSchemaConfig {
  relation: WhsLog["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkWhsLogAttachmentProps {
  relation: WhsLogAttachment["relation"];
  attachments: WhsLogAttachment["attachment"][];
}

export interface UpdateBulkWhsLogAttachmentProps
  extends CreateBulkWhsLogAttachmentProps {}

export interface DeleteBulkWhsLogAttachmentProps {
  relation: WhsLogAttachment["relation"];
}
