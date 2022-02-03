import IncidentAttachmentModel from "./incidentAttachment.model";
import {
  CreateBulkIncidentAttachmentProps,
  UpdateBulkIncidentAttachmentProps,
  DeleteBulkIncidentAttachmentProps,
} from "./incidentAttachment.types";

class IncidentAttachmentService {
  async createBulkIncidentAttachment(props: CreateBulkIncidentAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const incidentAttachment = await IncidentAttachmentModel.bulkCreate(
      createProps
    );
    return incidentAttachment;
  }

  async updateBulkIncidentAttachment(props: UpdateBulkIncidentAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkIncidentAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const incidentAttachment = await this.createBulkIncidentAttachment(props);
    return incidentAttachment;
  }

  async deleteBulkIncidentAttachment(props: DeleteBulkIncidentAttachmentProps) {
    const { relation } = props;
    await IncidentAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new IncidentAttachmentService();
