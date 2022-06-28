import ProcessAttachmentModel from "./processAttachment.model";
import {
  CreateBulkProcessAttachmentProps,
  UpdateBulkProcessAttachmentProps,
  DeleteBulkProcessAttachmentProps,
} from "./processAttachment.types";

class ProcessAttachmentService {
  async createBulkProcessAttachment(props: CreateBulkProcessAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const processAttachment = await ProcessAttachmentModel.bulkCreate(
      createProps
    );
    return processAttachment;
  }

  async updateBulkProcessAttachment(props: UpdateBulkProcessAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkProcessAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const processAttachment = await this.createBulkProcessAttachment(props);
    return processAttachment;
  }

  async deleteBulkProcessAttachment(props: DeleteBulkProcessAttachmentProps) {
    const { relation } = props;
    await ProcessAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ProcessAttachmentService();
