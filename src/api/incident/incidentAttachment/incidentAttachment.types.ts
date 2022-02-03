import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Incident } from "..";
import { Attachment } from "../../attachment";

export interface IncidentAttachment extends DefaultSchemaConfig {
  relation: Incident["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkIncidentAttachmentProps {
  relation: IncidentAttachment["relation"];
  attachments: IncidentAttachment["attachment"][];
}

export interface UpdateBulkIncidentAttachmentProps
  extends CreateBulkIncidentAttachmentProps {}

export interface DeleteBulkIncidentAttachmentProps {
  relation: IncidentAttachment["relation"];
}
