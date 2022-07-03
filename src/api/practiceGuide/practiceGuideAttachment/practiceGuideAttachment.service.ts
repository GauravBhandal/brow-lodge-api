import PracticeGuideAttachmentModel from "./practiceGuideAttachment.model";
import {
  CreateBulkPracticeGuideAttachmentProps,
  UpdateBulkPracticeGuideAttachmentProps,
  DeleteBulkPracticeGuideAttachmentProps,
} from "./practiceGuideAttachment.types";

class PracticeGuideAttachmentService {
  async createBulkPracticeGuideAttachment(
    props: CreateBulkPracticeGuideAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const practiceGuideAttachment =
      await PracticeGuideAttachmentModel.bulkCreate(createProps);
    return practiceGuideAttachment;
  }

  async updateBulkPracticeGuideAttachment(
    props: UpdateBulkPracticeGuideAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkPracticeGuideAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const practiceGuideAttachment =
      await this.createBulkPracticeGuideAttachment(props);
    return practiceGuideAttachment;
  }

  async deleteBulkPracticeGuideAttachment(
    props: DeleteBulkPracticeGuideAttachmentProps
  ) {
    const { relation } = props;
    await PracticeGuideAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new PracticeGuideAttachmentService();
