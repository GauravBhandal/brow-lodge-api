import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { PolicyReview } from "..";
import { Attachment } from "../../attachment";

export interface PolicyReviewAttachment extends DefaultSchemaConfig {
  relation: PolicyReview["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkPolicyReviewAttachmentProps {
  relation: PolicyReviewAttachment["relation"];
  attachments: PolicyReviewAttachment["attachment"][];
}

export interface UpdateBulkPolicyReviewAttachmentProps
  extends CreateBulkPolicyReviewAttachmentProps {}

export interface DeleteBulkPolicyReviewAttachmentProps {
  relation: PolicyReviewAttachment["relation"];
}
