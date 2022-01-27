import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { LeaseAndUtilityLog } from "..";
import { Attachment } from "../../attachment";

export interface LeaseAndUtilityLogAttachment extends DefaultSchemaConfig {
  relation: LeaseAndUtilityLog["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkLeaseAndUtilityLogAttachmentProps {
  relation: LeaseAndUtilityLogAttachment["relation"];
  attachments: LeaseAndUtilityLogAttachment["attachment"][];
}

export interface UpdateBulkLeaseAndUtilityLogAttachmentProps
  extends CreateBulkLeaseAndUtilityLogAttachmentProps {}

export interface DeleteBulkLeaseAndUtilityLogAttachmentProps {
  relation: LeaseAndUtilityLogAttachment["relation"];
}
