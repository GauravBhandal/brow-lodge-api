import TemplateAttachmentModel from "./templateAttachment.model";
import {
  CreateBulkTemplateAttachmentProps,
  UpdateBulkTemplateAttachmentProps,
  DeleteBulkTemplateAttachmentProps,
} from "./templateAttachment.types";

class TemplateAttachmentService {
  async createBulkTemplateAttachment(props: CreateBulkTemplateAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const templateAttachment = await TemplateAttachmentModel.bulkCreate(
      createProps
    );
    return templateAttachment;
  }

  async updateBulkTemplateAttachment(props: UpdateBulkTemplateAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkTemplateAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const templateAttachment = await this.createBulkTemplateAttachment(props);
    return templateAttachment;
  }

  async deleteBulkTemplateAttachment(props: DeleteBulkTemplateAttachmentProps) {
    const { relation } = props;
    await TemplateAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new TemplateAttachmentService();
