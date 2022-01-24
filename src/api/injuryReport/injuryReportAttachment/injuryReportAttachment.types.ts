import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { InjuryReport } from "../../injuryReport";
import { Attachment } from "../../attachment";

export interface InjuryReportAttachment extends DefaultSchemaConfig {
  relation: InjuryReport["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkInjuryReportAttachmentProps {
  relation: InjuryReportAttachment["relation"];
  attachments: InjuryReportAttachment["attachment"][];
}

export interface UpdateBulkInjuryReportAttachmentProps
  extends CreateBulkInjuryReportAttachmentProps {}

export interface DeleteBulkInjuryReportAttachmentProps {
  relation: InjuryReportAttachment["relation"];
}
