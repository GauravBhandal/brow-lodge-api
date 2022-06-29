import RpdhsResourceAttachmentModel from "./rpdhsResourceAttachment.model";
import {
  CreateBulkRpdhsResourceAttachmentProps,
  UpdateBulkRpdhsResourceAttachmentProps,
  DeleteBulkRpdhsResourceAttachmentProps,
} from "./rpdhsResourceAttachment.types";

class RpdhsResourceAttachmentService {
  async createBulkRpdhsResourceAttachment(
    props: CreateBulkRpdhsResourceAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const rpdhsResourceAttachment =
      await RpdhsResourceAttachmentModel.bulkCreate(createProps);
    return rpdhsResourceAttachment;
  }

  async updateBulkRpdhsResourceAttachment(
    props: UpdateBulkRpdhsResourceAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkRpdhsResourceAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const rpdhsResourceAttachment =
      await this.createBulkRpdhsResourceAttachment(props);
    return rpdhsResourceAttachment;
  }

  async deleteBulkRpdhsResourceAttachment(
    props: DeleteBulkRpdhsResourceAttachmentProps
  ) {
    const { relation } = props;
    await RpdhsResourceAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new RpdhsResourceAttachmentService();
