import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { RegulatoryCompliance } from "../../regulatoryCompliance";
import { Attachment } from "../../attachment";

export interface RegulatoryComplianceAttachment extends DefaultSchemaConfig {
  relation: RegulatoryCompliance["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkRegulatoryComplianceAttachmentProps {
  relation: RegulatoryComplianceAttachment["relation"];
  attachments: RegulatoryComplianceAttachment["attachment"][];
}

export interface UpdateBulkRegulatoryComplianceAttachmentProps
  extends CreateBulkRegulatoryComplianceAttachmentProps {}

export interface DeleteBulkRegulatoryComplianceAttachmentProps {
  relation: RegulatoryComplianceAttachment["relation"];
}
