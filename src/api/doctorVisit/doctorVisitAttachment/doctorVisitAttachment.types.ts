import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Attachment } from "../../attachment";
import { DoctorVisit } from "../doctorVisit.types";

export interface DoctorVisitAttachment extends DefaultSchemaConfig {
  relation: DoctorVisit["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkDoctorVisitAttachmentProps {
  relation: DoctorVisitAttachment["relation"];
  attachments: DoctorVisitAttachment["attachment"][];
}

export interface UpdateBulkDoctorVisitAttachmentProps
  extends CreateBulkDoctorVisitAttachmentProps {}

export interface DeleteBulkDoctorVisitAttachmentProps {
  relation: DoctorVisitAttachment["relation"];
}
