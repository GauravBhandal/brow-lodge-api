import StaffDocumentAttachmentModel from "./staffDocumentAttachment.model";
import {
  CreateBulkStaffDocumentAttachmentProps,
  UpdateBulkStaffDocumentAttachmentProps,
  DeleteBulkStaffDocumentAttachmentProps,
} from "./staffDocumentAttachment.types";

class StaffDocumentAttachmentService {
  async createBulkStaffDocumentAttachment(
    props: CreateBulkStaffDocumentAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const staffDocumentAttachment =
      await StaffDocumentAttachmentModel.bulkCreate(createProps);
    return staffDocumentAttachment;
  }

  async updateBulkStaffDocumentAttachment(
    props: UpdateBulkStaffDocumentAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkStaffDocumentAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const staffDocumentAttachment =
      await this.createBulkStaffDocumentAttachment(props);
    return staffDocumentAttachment;
  }

  async deleteBulkStaffDocumentAttachment(
    props: DeleteBulkStaffDocumentAttachmentProps
  ) {
    const { relation } = props;
    await StaffDocumentAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new StaffDocumentAttachmentService();
