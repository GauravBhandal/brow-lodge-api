import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Attachment } from "../../attachment";
import { Feedback } from "../feedback.types";

export interface FeedbackAttachment extends DefaultSchemaConfig {
  relation: Feedback["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkFeedbackAttachmentProps {
  relation: FeedbackAttachment["relation"];
  attachments: FeedbackAttachment["attachment"][];
}

export interface UpdateBulkFeedbackAttachmentProps
  extends CreateBulkFeedbackAttachmentProps {}

export interface DeleteBulkFeedbackAttachmentProps {
  relation: FeedbackAttachment["relation"];
}
