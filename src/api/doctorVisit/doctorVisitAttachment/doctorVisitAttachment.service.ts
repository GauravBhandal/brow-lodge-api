import DoctorVisitAttachmentModel from "./doctorVisitAttachment.model";
import {
  CreateBulkDoctorVisitAttachmentProps,
  UpdateBulkDoctorVisitAttachmentProps,
  DeleteBulkDoctorVisitAttachmentProps,
} from "./doctorVisitAttachment.types";

class DoctorVisitAttachmentService {
  async createBulkDoctorVisitAttachment(
    props: CreateBulkDoctorVisitAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const doctorVisitAttachment = await DoctorVisitAttachmentModel.bulkCreate(
      createProps
    );
    return doctorVisitAttachment;
  }

  async updateBulkDoctorVisitAttachment(
    props: UpdateBulkDoctorVisitAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkDoctorVisitAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const doctorVisitAttachment = await this.createBulkDoctorVisitAttachment(
      props
    );
    return doctorVisitAttachment;
  }

  async deleteBulkDoctorVisitAttachment(
    props: DeleteBulkDoctorVisitAttachmentProps
  ) {
    const { relation } = props;
    await DoctorVisitAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new DoctorVisitAttachmentService();
