import ConflictOfInterestAttachmentModel from "./conflictOfInterestAttachment.model";
import {
  CreateBulkConflictOfInterestAttachmentProps,
  UpdateBulkConflictOfInterestAttachmentProps,
  DeleteBulkConflictOfInterestAttachmentProps,
} from "./conflictOfInterestAttachment.types";

class ConflictOfInterestAttachmentService {
  async createBulkConflictOfInterestAttachment(
    props: CreateBulkConflictOfInterestAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const conflictOfInterestAttachment =
      await ConflictOfInterestAttachmentModel.bulkCreate(createProps);
    return conflictOfInterestAttachment;
  }

  async updateBulkConflictOfInterestAttachment(
    props: UpdateBulkConflictOfInterestAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkConflictOfInterestAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const conflictOfInterestAttachment =
      await this.createBulkConflictOfInterestAttachment(props);
    return conflictOfInterestAttachment;
  }

  async deleteBulkConflictOfInterestAttachment(
    props: DeleteBulkConflictOfInterestAttachmentProps
  ) {
    const { relation } = props;
    await ConflictOfInterestAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ConflictOfInterestAttachmentService();
