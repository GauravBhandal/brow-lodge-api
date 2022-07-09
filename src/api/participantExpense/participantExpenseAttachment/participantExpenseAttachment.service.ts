import ParticipantExpenseAttachmentModel from "./participantExpenseAttachment.model";
import {
  CreateBulkParticipantExpenseAttachmentProps,
  UpdateBulkParticipantExpenseAttachmentProps,
  DeleteBulkParticipantExpenseAttachmentProps,
} from "./participantExpenseAttachment.types";

class ParticipantExpenseAttachmentService {
  async createBulkParticipantExpenseAttachment(
    props: CreateBulkParticipantExpenseAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const participantExpenseAttachment = await ParticipantExpenseAttachmentModel.bulkCreate(
      createProps
    );
    return participantExpenseAttachment;
  }

  async updateBulkParticipantExpenseAttachment(
    props: UpdateBulkParticipantExpenseAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkParticipantExpenseAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const participantExpenseAttachment = await this.createBulkParticipantExpenseAttachment(
      props
    );
    return participantExpenseAttachment;
  }

  async deleteBulkParticipantExpenseAttachment(
    props: DeleteBulkParticipantExpenseAttachmentProps
  ) {
    const { relation } = props;
    await ParticipantExpenseAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ParticipantExpenseAttachmentService();
