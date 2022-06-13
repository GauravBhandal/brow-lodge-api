import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { StaffSupervisionLog } from "..";
import { Attachment } from "../../attachment";

export interface StaffSupervisionLogAttachment extends DefaultSchemaConfig {
  relation: StaffSupervisionLog["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkStaffSupervisionLogAttachmentProps {
  relation: StaffSupervisionLogAttachment["relation"];
  attachments: StaffSupervisionLogAttachment["attachment"][];
}

export interface UpdateBulkStaffSupervisionLogAttachmentProps
  extends CreateBulkStaffSupervisionLogAttachmentProps {}

export interface DeleteBulkStaffSupervisionLogAttachmentProps {
  relation: StaffSupervisionLogAttachment["relation"];
}
