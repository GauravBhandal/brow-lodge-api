import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ProgressReport } from "..";
import { Attachment } from "../../attachment";

export interface ProgressReportAttachment extends DefaultSchemaConfig {
  relation: ProgressReport["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkProgressReportAttachmentProps {
  relation: ProgressReportAttachment["relation"];
  attachments: ProgressReportAttachment["attachment"][];
}

export interface UpdateBulkProgressReportAttachmentProps
  extends CreateBulkProgressReportAttachmentProps {}

export interface DeleteBulkProgressReportAttachmentProps {
  relation: ProgressReportAttachment["relation"];
}
