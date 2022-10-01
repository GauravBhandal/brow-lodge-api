import ProgressReportAttachmentModel from "./progressReportAttachment.model";
import {
  CreateBulkProgressReportAttachmentProps,
  UpdateBulkProgressReportAttachmentProps,
  DeleteBulkProgressReportAttachmentProps,
} from "./progressReportAttachment.types";

class ProgressReportAttachmentService {
  async createBulkProgressReportAttachment(
    props: CreateBulkProgressReportAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const progressReportAttachment =
      await ProgressReportAttachmentModel.bulkCreate(createProps);
    return progressReportAttachment;
  }

  async updateBulkProgressReportAttachment(
    props: UpdateBulkProgressReportAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkProgressReportAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const progressReportAttachment =
      await this.createBulkProgressReportAttachment(props);
    return progressReportAttachment;
  }

  async deleteBulkProgressReportAttachment(
    props: DeleteBulkProgressReportAttachmentProps
  ) {
    const { relation } = props;
    await ProgressReportAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ProgressReportAttachmentService();
