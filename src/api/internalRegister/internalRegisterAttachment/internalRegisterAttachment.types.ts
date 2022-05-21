import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { InternalRegister } from "../../internalRegister";
import { Attachment } from "../../attachment";

export interface InternalRegisterAttachment extends DefaultSchemaConfig {
  relation: InternalRegister["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkInternalRegisterAttachmentProps {
  relation: InternalRegisterAttachment["relation"];
  attachments: InternalRegisterAttachment["attachment"][];
}

export interface UpdateBulkInternalRegisterAttachmentProps
  extends CreateBulkInternalRegisterAttachmentProps {}

export interface DeleteBulkInternalRegisterAttachmentProps {
  relation: InternalRegisterAttachment["relation"];
}
