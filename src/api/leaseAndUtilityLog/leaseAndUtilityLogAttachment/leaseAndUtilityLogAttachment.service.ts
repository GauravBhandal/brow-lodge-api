import LeaseAndUtilityLogAttachmentModel from "./leaseAndUtilityLogAttachment.model";
import {
  CreateBulkLeaseAndUtilityLogAttachmentProps,
  UpdateBulkLeaseAndUtilityLogAttachmentProps,
  DeleteBulkLeaseAndUtilityLogAttachmentProps,
} from "./leaseAndUtilityLogAttachment.types";

class LeaseAndUtilityLogAttachmentService {
  async createBulkLeaseAndUtilityLogAttachment(
    props: CreateBulkLeaseAndUtilityLogAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const leaseAndUtilityLogAttachment =
      await LeaseAndUtilityLogAttachmentModel.bulkCreate(createProps);
    return leaseAndUtilityLogAttachment;
  }

  async updateBulkLeaseAndUtilityLogAttachment(
    props: UpdateBulkLeaseAndUtilityLogAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkLeaseAndUtilityLogAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const leaseAndUtilityLogAttachment =
      await this.createBulkLeaseAndUtilityLogAttachment(props);
    return leaseAndUtilityLogAttachment;
  }

  async deleteBulkLeaseAndUtilityLogAttachment(
    props: DeleteBulkLeaseAndUtilityLogAttachmentProps
  ) {
    const { relation } = props;
    await LeaseAndUtilityLogAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new LeaseAndUtilityLogAttachmentService();
