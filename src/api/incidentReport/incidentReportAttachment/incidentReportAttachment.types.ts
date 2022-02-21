import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { IncidentReport } from "..";
import { Attachment } from "../../attachment";

export interface IncidentReportAttachment extends DefaultSchemaConfig {
  relation: IncidentReport["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkIncidentReportAttachmentProps {
  relation: IncidentReportAttachment["relation"];
  attachments: IncidentReportAttachment["attachment"][];
}

export interface UpdateBulkIncidentReportAttachmentProps
  extends CreateBulkIncidentReportAttachmentProps {}

export interface DeleteBulkIncidentReportAttachmentProps {
  relation: IncidentReportAttachment["relation"];
}
