import RegulatoryComplianceAttachmentModel from "./regulatoryComplianceAttachment.model";
import {
  CreateBulkRegulatoryComplianceAttachmentProps,
  UpdateBulkRegulatoryComplianceAttachmentProps,
  DeleteBulkRegulatoryComplianceAttachmentProps,
} from "./regulatoryComplianceAttachment.types";

class RegulatoryComplianceAttachmentService {
  async createBulkRegulatoryComplianceAttachment(
    props: CreateBulkRegulatoryComplianceAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const regulatoryComplianceAttachment =
      await RegulatoryComplianceAttachmentModel.bulkCreate(createProps);
    return regulatoryComplianceAttachment;
  }

  async updateBulkRegulatoryComplianceAttachment(
    props: UpdateBulkRegulatoryComplianceAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkRegulatoryComplianceAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const regulatoryComplianceAttachment =
      await this.createBulkRegulatoryComplianceAttachment(props);
    return regulatoryComplianceAttachment;
  }

  async deleteBulkRegulatoryComplianceAttachment(
    props: DeleteBulkRegulatoryComplianceAttachmentProps
  ) {
    const { relation } = props;
    await RegulatoryComplianceAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new RegulatoryComplianceAttachmentService();
