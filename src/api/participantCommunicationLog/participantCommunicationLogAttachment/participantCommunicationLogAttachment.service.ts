import ParticipantCommunicationLogAttachmentModel from "./participantCommunicationLogAttachment.model";
import {
  CreateBulkParticipantCommunicationLogAttachmentProps,
  UpdateBulkParticipantCommunicationLogAttachmentProps,
  DeleteBulkParticipantCommunicationLogAttachmentProps,
} from "./participantCommunicationLogAttachment.types";

class ParticipantCommunicationLogAttachmentService {
  async createBulkParticipantCommunicationLogAttachment(
    props: CreateBulkParticipantCommunicationLogAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const participantCommunicationLogAttachment =
      await ParticipantCommunicationLogAttachmentModel.bulkCreate(createProps);
    return participantCommunicationLogAttachment;
  }

  async updateBulkParticipantCommunicationLogAttachment(
    props: UpdateBulkParticipantCommunicationLogAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkParticipantCommunicationLogAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const participantCommunicationLogAttachment =
      await this.createBulkParticipantCommunicationLogAttachment(props);
    return participantCommunicationLogAttachment;
  }

  async deleteBulkParticipantCommunicationLogAttachment(
    props: DeleteBulkParticipantCommunicationLogAttachmentProps
  ) {
    const { relation } = props;
    await ParticipantCommunicationLogAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ParticipantCommunicationLogAttachmentService();
