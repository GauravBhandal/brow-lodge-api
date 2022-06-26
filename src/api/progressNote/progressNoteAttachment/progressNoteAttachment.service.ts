import ProgressNoteAttachmentModel from "./progressNoteAttachment.model";
import {
  CreateBulkProgressNoteAttachmentProps,
  UpdateBulkProgressNoteAttachmentProps,
  DeleteBulkProgressNoteAttachmentProps,
} from "./progressNoteAttachment.types";

class ProgressNoteAttachmentService {
  async createBulkProgressNoteAttachment(
    props: CreateBulkProgressNoteAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const progressNoteAttachment = await ProgressNoteAttachmentModel.bulkCreate(
      createProps
    );
    return progressNoteAttachment;
  }

  async updateBulkProgressNoteAttachment(
    props: UpdateBulkProgressNoteAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkProgressNoteAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const progressNoteAttachment = await this.createBulkProgressNoteAttachment(
      props
    );
    return progressNoteAttachment;
  }

  async deleteBulkProgressNoteAttachment(
    props: DeleteBulkProgressNoteAttachmentProps
  ) {
    const { relation } = props;
    await ProgressNoteAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ProgressNoteAttachmentService();
