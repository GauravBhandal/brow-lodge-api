import ExternalContractAttachmentModel from "./externalContractAttachment.model";
import {
  CreateBulkExternalContractAttachmentProps,
  UpdateBulkExternalContractAttachmentProps,
  DeleteBulkExternalContractAttachmentProps,
} from "./externalContractAttachment.types";

class ExternalContractAttachmentService {
  async createBulkExternalContractAttachment(
    props: CreateBulkExternalContractAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const externalContractAttachment =
      await ExternalContractAttachmentModel.bulkCreate(createProps);
    return externalContractAttachment;
  }

  async updateBulkExternalContractAttachment(
    props: UpdateBulkExternalContractAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkExternalContractAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const externalContractAttachment =
      await this.createBulkExternalContractAttachment(props);
    return externalContractAttachment;
  }

  async deleteBulkExternalContractAttachment(
    props: DeleteBulkExternalContractAttachmentProps
  ) {
    const { relation } = props;
    await ExternalContractAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ExternalContractAttachmentService();
