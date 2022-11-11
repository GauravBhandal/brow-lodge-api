import ServiceDeliveryAttachmentModel from "./serviceDeliveryAttachment.model";
import {
  CreateBulkServiceDeliveryAttachmentProps,
  UpdateBulkServiceDeliveryAttachmentProps,
  DeleteBulkServiceDeliveryAttachmentProps,
} from "./serviceDeliveryAttachment.types";

class ServiceDeliveryAttachmentService {
  async createBulkServiceDeliveryAttachment(
    props: CreateBulkServiceDeliveryAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const serviceDeliveryAttachment =
      await ServiceDeliveryAttachmentModel.bulkCreate(createProps);
    return serviceDeliveryAttachment;
  }

  async updateBulkServiceDeliveryAttachment(
    props: UpdateBulkServiceDeliveryAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkServiceDeliveryAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const serviceDeliveryAttachment =
      await this.createBulkServiceDeliveryAttachment(props);
    return serviceDeliveryAttachment;
  }

  async deleteBulkServiceDeliveryAttachment(
    props: DeleteBulkServiceDeliveryAttachmentProps
  ) {
    const { relation } = props;
    await ServiceDeliveryAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ServiceDeliveryAttachmentService();
