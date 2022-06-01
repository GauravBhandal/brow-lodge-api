import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Attachment } from "../../attachment";
import { ClientRisk } from "../clientRisk.types";

export interface ClientRiskAttachment extends DefaultSchemaConfig {
  relation: ClientRisk["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkClientRiskAttachmentProps {
  relation: ClientRiskAttachment["relation"];
  attachments: ClientRiskAttachment["attachment"][];
}

export interface UpdateBulkClientRiskAttachmentProps
  extends CreateBulkClientRiskAttachmentProps {}

export interface DeleteBulkClientRiskAttachmentProps {
  relation: ClientRiskAttachment["relation"];
}
