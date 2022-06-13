import ParticipantMedicationChartAttachmentModel from "./participantMedicationChartAttachment.model";
import {
  CreateBulkParticipantMedicationChartAttachmentProps,
  UpdateBulkParticipantMedicationChartAttachmentProps,
  DeleteBulkParticipantMedicationChartAttachmentProps,
} from "./participantMedicationChartAttachment.types";

class ParticipantMedicationChartAttachmentService {
  async createBulkParticipantMedicationChartAttachment(
    props: CreateBulkParticipantMedicationChartAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const participantMedicationChartAttachment =
      await ParticipantMedicationChartAttachmentModel.bulkCreate(createProps);
    return participantMedicationChartAttachment;
  }

  async updateBulkParticipantMedicationChartAttachment(
    props: UpdateBulkParticipantMedicationChartAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkParticipantMedicationChartAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const participantMedicationChartAttachment =
      await this.createBulkParticipantMedicationChartAttachment(props);
    return participantMedicationChartAttachment;
  }

  async deleteBulkParticipantMedicationChartAttachment(
    props: DeleteBulkParticipantMedicationChartAttachmentProps
  ) {
    const { relation } = props;
    await ParticipantMedicationChartAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ParticipantMedicationChartAttachmentService();
