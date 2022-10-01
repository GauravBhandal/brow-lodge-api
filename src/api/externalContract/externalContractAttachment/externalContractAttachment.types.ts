import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ExternalContract } from "../../externalContract";
import { Attachment } from "../../attachment";

export interface ExternalContractAttachment extends DefaultSchemaConfig {
  relation: ExternalContract["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkExternalContractAttachmentProps {
  relation: ExternalContractAttachment["relation"];
  attachments: ExternalContractAttachment["attachment"][];
}

export interface UpdateBulkExternalContractAttachmentProps
  extends CreateBulkExternalContractAttachmentProps {}

export interface DeleteBulkExternalContractAttachmentProps {
  relation: ExternalContractAttachment["relation"];
}
