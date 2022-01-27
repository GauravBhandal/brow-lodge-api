import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { RepairRequest } from "..";
import { Attachment } from "../../attachment";

export interface RepairRequestAttachment extends DefaultSchemaConfig {
  relation: RepairRequest["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkRepairRequestAttachmentProps {
  relation: RepairRequestAttachment["relation"];
  attachments: RepairRequestAttachment["attachment"][];
}

export interface UpdateBulkRepairRequestAttachmentProps
  extends CreateBulkRepairRequestAttachmentProps {}

export interface DeleteBulkRepairRequestAttachmentProps {
  relation: RepairRequestAttachment["relation"];
}
