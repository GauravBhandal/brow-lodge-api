import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Policy } from "../../policy";
import { Attachment } from "../../attachment";

export interface PolicyAttachment extends DefaultSchemaConfig {
  relation: Policy["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkPolicyAttachmentProps {
  relation: PolicyAttachment["relation"];
  attachments: PolicyAttachment["attachment"][];
}

export interface UpdateBulkPolicyAttachmentProps
  extends CreateBulkPolicyAttachmentProps {}

export interface DeleteBulkPolicyAttachmentProps {
  relation: PolicyAttachment["relation"];
}
