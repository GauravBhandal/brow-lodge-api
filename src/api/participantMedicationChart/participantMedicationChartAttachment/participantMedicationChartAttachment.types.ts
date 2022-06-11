import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ParticipantMedicationChart } from "../../participantMedicationChart";
import { Attachment } from "../../attachment";

export interface ParticipantMedicationChartAttachment
  extends DefaultSchemaConfig {
  relation: ParticipantMedicationChart["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkParticipantMedicationChartAttachmentProps {
  relation: ParticipantMedicationChartAttachment["relation"];
  attachments: ParticipantMedicationChartAttachment["attachment"][];
}

export interface UpdateBulkParticipantMedicationChartAttachmentProps
  extends CreateBulkParticipantMedicationChartAttachmentProps {}

export interface DeleteBulkParticipantMedicationChartAttachmentProps {
  relation: ParticipantMedicationChartAttachment["relation"];
}
