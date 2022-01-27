import RepairRequestAttachmentModel from "./repairRequestAttachment.model";
import {
  CreateBulkRepairRequestAttachmentProps,
  UpdateBulkRepairRequestAttachmentProps,
  DeleteBulkRepairRequestAttachmentProps,
} from "./repairRequestAttachment.types";

class RepairRequestAttachmentService {
  async createBulkRepairRequestAttachment(
    props: CreateBulkRepairRequestAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const repairRequestAttachment =
      await RepairRequestAttachmentModel.bulkCreate(createProps);
    return repairRequestAttachment;
  }

  async updateBulkRepairRequestAttachment(
    props: UpdateBulkRepairRequestAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkRepairRequestAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const repairRequestAttachment =
      await this.createBulkRepairRequestAttachment(props);
    return repairRequestAttachment;
  }

  async deleteBulkRepairRequestAttachment(
    props: DeleteBulkRepairRequestAttachmentProps
  ) {
    const { relation } = props;
    await RepairRequestAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new RepairRequestAttachmentService();
