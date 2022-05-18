import FeedbackAttachmentModel from "./feedbackAttachment.model";
import {
  CreateBulkFeedbackAttachmentProps,
  UpdateBulkFeedbackAttachmentProps,
  DeleteBulkFeedbackAttachmentProps,
} from "./feedbackAttachment.types";

class FeedbackAttachmentService {
  async createBulkFeedbackAttachment(props: CreateBulkFeedbackAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const feedbackAttachment = await FeedbackAttachmentModel.bulkCreate(
      createProps
    );
    return feedbackAttachment;
  }

  async updateBulkFeedbackAttachment(props: UpdateBulkFeedbackAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkFeedbackAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const feedbackAttachment = await this.createBulkFeedbackAttachment(props);
    return feedbackAttachment;
  }

  async deleteBulkFeedbackAttachment(props: DeleteBulkFeedbackAttachmentProps) {
    const { relation } = props;
    await FeedbackAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new FeedbackAttachmentService();
