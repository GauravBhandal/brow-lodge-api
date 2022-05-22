import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { MeetingLog } from "..";
import { Attachment } from "../../attachment";

export interface MeetingLogAttachment extends DefaultSchemaConfig {
  relation: MeetingLog["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkMeetingLogAttachmentProps {
  relation: MeetingLogAttachment["relation"];
  attachments: MeetingLogAttachment["attachment"][];
}

export interface UpdateBulkMeetingLogAttachmentProps
  extends CreateBulkMeetingLogAttachmentProps {}

export interface DeleteBulkMeetingLogAttachmentProps {
  relation: MeetingLogAttachment["relation"];
}
