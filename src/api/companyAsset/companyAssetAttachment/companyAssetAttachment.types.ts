import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { CompanyAsset } from "..";
import { Attachment } from "../../attachment";

export interface CompanyAssetAttachment extends DefaultSchemaConfig {
  relation: CompanyAsset["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkCompanyAssetAttachmentProps {
  relation: CompanyAssetAttachment["relation"];
  attachments: CompanyAssetAttachment["attachment"][];
}

export interface UpdateBulkCompanyAssetAttachmentProps
  extends CreateBulkCompanyAssetAttachmentProps {}

export interface DeleteBulkCompanyAssetAttachmentProps {
  relation: CompanyAssetAttachment["relation"];
}
