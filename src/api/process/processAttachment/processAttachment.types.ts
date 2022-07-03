import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Process } from "../../process";
import { Attachment } from "../../attachment";

export interface ProcessAttachment extends DefaultSchemaConfig {
  relation: Process["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkProcessAttachmentProps {
  relation: ProcessAttachment["relation"];
  attachments: ProcessAttachment["attachment"][];
}

export interface UpdateBulkProcessAttachmentProps
  extends CreateBulkProcessAttachmentProps {}

export interface DeleteBulkProcessAttachmentProps {
  relation: ProcessAttachment["relation"];
}
