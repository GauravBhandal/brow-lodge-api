import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { PracticeGuide } from "../../practiceGuide";
import { Attachment } from "../../attachment";

export interface PracticeGuideAttachment extends DefaultSchemaConfig {
  relation: PracticeGuide["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkPracticeGuideAttachmentProps {
  relation: PracticeGuideAttachment["relation"];
  attachments: PracticeGuideAttachment["attachment"][];
}

export interface UpdateBulkPracticeGuideAttachmentProps
  extends CreateBulkPracticeGuideAttachmentProps {}

export interface DeleteBulkPracticeGuideAttachmentProps {
  relation: PracticeGuideAttachment["relation"];
}
