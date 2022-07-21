import LegislationRegisterAttachmentModel from "./legislationRegisterAttachment.model";
import {
  CreateBulkLegislationRegisterAttachmentProps,
  UpdateBulkLegislationRegisterAttachmentProps,
  DeleteBulkLegislationRegisterAttachmentProps,
} from "./legislationRegisterAttachment.types";

class LegislationRegisterAttachmentService {
  async createBulkLegislationRegisterAttachment(
    props: CreateBulkLegislationRegisterAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const legislationRegisterAttachment =
      await LegislationRegisterAttachmentModel.bulkCreate(createProps);
    return legislationRegisterAttachment;
  }

  async updateBulkLegislationRegisterAttachment(
    props: UpdateBulkLegislationRegisterAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkLegislationRegisterAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const legislationRegisterAttachment =
      await this.createBulkLegislationRegisterAttachment(props);
    return legislationRegisterAttachment;
  }

  async deleteBulkLegislationRegisterAttachment(
    props: DeleteBulkLegislationRegisterAttachmentProps
  ) {
    const { relation } = props;
    await LegislationRegisterAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new LegislationRegisterAttachmentService();
