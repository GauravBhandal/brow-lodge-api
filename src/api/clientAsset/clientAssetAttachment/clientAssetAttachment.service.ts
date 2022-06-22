import ClientAssetAttachmentModel from "./clientAssetAttachment.model";
import {
  CreateBulkClientAssetAttachmentProps,
  UpdateBulkClientAssetAttachmentProps,
  DeleteBulkClientAssetAttachmentProps,
} from "./clientAssetAttachment.types";

class ClientAssetAttachmentService {
  async createBulkClientAssetAttachment(
    props: CreateBulkClientAssetAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const clientAssetAttachment = await ClientAssetAttachmentModel.bulkCreate(
      createProps
    );
    return clientAssetAttachment;
  }

  async updateBulkClientAssetAttachment(
    props: UpdateBulkClientAssetAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkClientAssetAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const clientAssetAttachment = await this.createBulkClientAssetAttachment(
      props
    );
    return clientAssetAttachment;
  }

  async deleteBulkClientAssetAttachment(
    props: DeleteBulkClientAssetAttachmentProps
  ) {
    const { relation } = props;
    await ClientAssetAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ClientAssetAttachmentService();
