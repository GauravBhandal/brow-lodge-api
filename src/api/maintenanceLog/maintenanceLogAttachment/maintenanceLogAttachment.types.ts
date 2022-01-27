import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { MaintenanceLog } from "..";
import { Attachment } from "../../attachment";

export interface MaintenanceLogAttachment extends DefaultSchemaConfig {
  relation: MaintenanceLog["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkMaintenanceLogAttachmentProps {
  relation: MaintenanceLogAttachment["relation"];
  attachments: MaintenanceLogAttachment["attachment"][];
}

export interface UpdateBulkMaintenanceLogAttachmentProps
  extends CreateBulkMaintenanceLogAttachmentProps {}

export interface DeleteBulkMaintenanceLogAttachmentProps {
  relation: MaintenanceLogAttachment["relation"];
}
