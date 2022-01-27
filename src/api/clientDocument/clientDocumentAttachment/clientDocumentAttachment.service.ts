import ClientDocumentAttachmentModel from "./clientDocumentAttachment.model";
import {
  CreateBulkClientDocumentAttachmentProps,
  UpdateBulkClientDocumentAttachmentProps,
  DeleteBulkClientDocumentAttachmentProps,
} from "./clientDocumentAttachment.types";

class ClientDocumentAttachmentService {
  async createBulkClientDocumentAttachment(
    props: CreateBulkClientDocumentAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const clientDocumentAttachment =
      await ClientDocumentAttachmentModel.bulkCreate(createProps);
    return clientDocumentAttachment;
  }

  async updateBulkClientDocumentAttachment(
    props: UpdateBulkClientDocumentAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkClientDocumentAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const clientDocumentAttachment =
      await this.createBulkClientDocumentAttachment(props);
    return clientDocumentAttachment;
  }

  async deleteBulkClientDocumentAttachment(
    props: DeleteBulkClientDocumentAttachmentProps
  ) {
    const { relation } = props;
    await ClientDocumentAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ClientDocumentAttachmentService();
