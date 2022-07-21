import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { LegislationRegister } from "..";
import { Attachment } from "../../attachment";

export interface LegislationRegisterAttachment extends DefaultSchemaConfig {
  relation: LegislationRegister["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkLegislationRegisterAttachmentProps {
  relation: LegislationRegisterAttachment["relation"];
  attachments: LegislationRegisterAttachment["attachment"][];
}

export interface UpdateBulkLegislationRegisterAttachmentProps
  extends CreateBulkLegislationRegisterAttachmentProps {}

export interface DeleteBulkLegislationRegisterAttachmentProps {
  relation: LegislationRegisterAttachment["relation"];
}
