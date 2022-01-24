import InjuryReportAttachmentModel from "./injuryReportAttachment.model";
import {
  CreateBulkInjuryReportAttachmentProps,
  UpdateBulkInjuryReportAttachmentProps,
  DeleteBulkInjuryReportAttachmentProps,
} from "./injuryReportAttachment.types";

class InjuryReportAttachmentService {
  async createBulkInjuryReportAttachment(
    props: CreateBulkInjuryReportAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const injuryReportAttachment = await InjuryReportAttachmentModel.bulkCreate(
      createProps
    );
    return injuryReportAttachment;
  }

  async updateBulkInjuryReportAttachment(
    props: UpdateBulkInjuryReportAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkInjuryReportAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const injuryReportAttachment = await this.createBulkInjuryReportAttachment(
      props
    );
    return injuryReportAttachment;
  }

  async deleteBulkInjuryReportAttachment(
    props: DeleteBulkInjuryReportAttachmentProps
  ) {
    const { relation } = props;
    await InjuryReportAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new InjuryReportAttachmentService();
