import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { RpdhsResource } from "../../rpdhsResource";
import { Attachment } from "../../attachment";

export interface RpdhsResourceAttachment extends DefaultSchemaConfig {
  relation: RpdhsResource["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkRpdhsResourceAttachmentProps {
  relation: RpdhsResourceAttachment["relation"];
  attachments: RpdhsResourceAttachment["attachment"][];
}

export interface UpdateBulkRpdhsResourceAttachmentProps
  extends CreateBulkRpdhsResourceAttachmentProps {}

export interface DeleteBulkRpdhsResourceAttachmentProps {
  relation: RpdhsResourceAttachment["relation"];
}
