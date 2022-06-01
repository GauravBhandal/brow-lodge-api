import ClientRiskAttachmentModel from "./clientRiskAttachment.model";
import {
  CreateBulkClientRiskAttachmentProps,
  UpdateBulkClientRiskAttachmentProps,
  DeleteBulkClientRiskAttachmentProps,
} from "./clientRiskAttachment.types";

class ClientRiskAttachmentService {
  async createBulkClientRiskAttachment(
    props: CreateBulkClientRiskAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const clientRiskAttachment = await ClientRiskAttachmentModel.bulkCreate(
      createProps
    );
    return clientRiskAttachment;
  }

  async updateBulkClientRiskAttachment(
    props: UpdateBulkClientRiskAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkClientRiskAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const clientRiskAttachment = await this.createBulkClientRiskAttachment(
      props
    );
    return clientRiskAttachment;
  }

  async deleteBulkClientRiskAttachment(
    props: DeleteBulkClientRiskAttachmentProps
  ) {
    const { relation } = props;
    await ClientRiskAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ClientRiskAttachmentService();
