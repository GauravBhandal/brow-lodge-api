import StaffSupervisionLogAttachmentModel from "./staffSupervisionLogAttachment.model";
import {
  CreateBulkStaffSupervisionLogAttachmentProps,
  UpdateBulkStaffSupervisionLogAttachmentProps,
  DeleteBulkStaffSupervisionLogAttachmentProps,
} from "./staffSupervisionLogAttachment.types";

class StaffSupervisionLogAttachmentService {
  async createBulkStaffSupervisionLogAttachment(
    props: CreateBulkStaffSupervisionLogAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const staffSupervisionLogAttachment =
      await StaffSupervisionLogAttachmentModel.bulkCreate(createProps);
    return staffSupervisionLogAttachment;
  }

  async updateBulkStaffSupervisionLogAttachment(
    props: UpdateBulkStaffSupervisionLogAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkStaffSupervisionLogAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const staffSupervisionLogAttachment =
      await this.createBulkStaffSupervisionLogAttachment(props);
    return staffSupervisionLogAttachment;
  }

  async deleteBulkStaffSupervisionLogAttachment(
    props: DeleteBulkStaffSupervisionLogAttachmentProps
  ) {
    const { relation } = props;
    await StaffSupervisionLogAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new StaffSupervisionLogAttachmentService();
