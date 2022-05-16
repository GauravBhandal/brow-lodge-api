import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Template } from "../../template";
import { Attachment } from "../../attachment";

export interface TemplateAttachment extends DefaultSchemaConfig {
  relation: Template["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkTemplateAttachmentProps {
  relation: TemplateAttachment["relation"];
  attachments: TemplateAttachment["attachment"][];
}

export interface UpdateBulkTemplateAttachmentProps
  extends CreateBulkTemplateAttachmentProps {}

export interface DeleteBulkTemplateAttachmentProps {
  relation: TemplateAttachment["relation"];
}
