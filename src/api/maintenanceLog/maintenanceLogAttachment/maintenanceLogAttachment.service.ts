import MaintenanceLogAttachmentModel from "./maintenanceLogAttachment.model";
import {
  CreateBulkMaintenanceLogAttachmentProps,
  UpdateBulkMaintenanceLogAttachmentProps,
  DeleteBulkMaintenanceLogAttachmentProps,
} from "./maintenanceLogAttachment.types";

class MaintenanceLogAttachmentService {
  async createBulkMaintenanceLogAttachment(
    props: CreateBulkMaintenanceLogAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const maintenanceLogAttachment =
      await MaintenanceLogAttachmentModel.bulkCreate(createProps);
    return maintenanceLogAttachment;
  }

  async updateBulkMaintenanceLogAttachment(
    props: UpdateBulkMaintenanceLogAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkMaintenanceLogAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const maintenanceLogAttachment =
      await this.createBulkMaintenanceLogAttachment(props);
    return maintenanceLogAttachment;
  }

  async deleteBulkMaintenanceLogAttachment(
    props: DeleteBulkMaintenanceLogAttachmentProps
  ) {
    const { relation } = props;
    await MaintenanceLogAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new MaintenanceLogAttachmentService();
