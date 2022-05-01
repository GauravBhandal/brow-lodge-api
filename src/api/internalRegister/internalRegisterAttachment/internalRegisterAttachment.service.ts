import InternalRegisterAttachmentModel from "./internalRegisterAttachment.model";
import {
  CreateBulkInternalRegisterAttachmentProps,
  UpdateBulkInternalRegisterAttachmentProps,
  DeleteBulkInternalRegisterAttachmentProps,
} from "./internalRegisterAttachment.types";

class InternalRegisterAttachmentService {
  async createBulkInternalRegisterAttachment(
    props: CreateBulkInternalRegisterAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const internalRegisterAttachment =
      await InternalRegisterAttachmentModel.bulkCreate(createProps);
    return internalRegisterAttachment;
  }

  async updateBulkInternalRegisterAttachment(
    props: UpdateBulkInternalRegisterAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkInternalRegisterAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const internalRegisterAttachment =
      await this.createBulkInternalRegisterAttachment(props);
    return internalRegisterAttachment;
  }

  async deleteBulkInternalRegisterAttachment(
    props: DeleteBulkInternalRegisterAttachmentProps
  ) {
    const { relation } = props;
    await InternalRegisterAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new InternalRegisterAttachmentService();
