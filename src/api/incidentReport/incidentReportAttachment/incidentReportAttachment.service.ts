import IncidentReportAttachmentModel from "./incidentReportAttachment.model";
import {
  CreateBulkIncidentReportAttachmentProps,
  UpdateBulkIncidentReportAttachmentProps,
  DeleteBulkIncidentReportAttachmentProps,
} from "./incidentReportAttachment.types";

class IncidentReportAttachmentService {
  async createBulkIncidentReportAttachment(
    props: CreateBulkIncidentReportAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const incidentReportAttachment =
      await IncidentReportAttachmentModel.bulkCreate(createProps);
    return incidentReportAttachment;
  }

  async updateBulkIncidentReportAttachment(
    props: UpdateBulkIncidentReportAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkIncidentReportAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const incidentReportAttachment =
      await this.createBulkIncidentReportAttachment(props);
    return incidentReportAttachment;
  }

  async deleteBulkIncidentReportAttachment(
    props: DeleteBulkIncidentReportAttachmentProps
  ) {
    const { relation } = props;
    await IncidentReportAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new IncidentReportAttachmentService();
