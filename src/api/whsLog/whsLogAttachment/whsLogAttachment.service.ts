import WhsLogAttachmentModel from "./whsLogAttachment.model";
import {
  CreateBulkWhsLogAttachmentProps,
  UpdateBulkWhsLogAttachmentProps,
  DeleteBulkWhsLogAttachmentProps,
} from "./whsLogAttachment.types";

class WhsLogAttachmentService {
  async createBulkWhsLogAttachment(props: CreateBulkWhsLogAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const whsLogAttachment = await WhsLogAttachmentModel.bulkCreate(
      createProps
    );
    return whsLogAttachment;
  }

  async updateBulkWhsLogAttachment(props: UpdateBulkWhsLogAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkWhsLogAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const whsLogAttachment = await this.createBulkWhsLogAttachment(props);
    return whsLogAttachment;
  }

  async deleteBulkWhsLogAttachment(props: DeleteBulkWhsLogAttachmentProps) {
    const { relation } = props;
    await WhsLogAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new WhsLogAttachmentService();
