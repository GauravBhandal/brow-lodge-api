import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ClientAsset } from "..";
import { Attachment } from "../../attachment";

export interface ClientAssetAttachment extends DefaultSchemaConfig {
  relation: ClientAsset["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkClientAssetAttachmentProps {
  relation: ClientAssetAttachment["relation"];
  attachments: ClientAssetAttachment["attachment"][];
}

export interface UpdateBulkClientAssetAttachmentProps
  extends CreateBulkClientAssetAttachmentProps {}

export interface DeleteBulkClientAssetAttachmentProps {
  relation: ClientAssetAttachment["relation"];
}
