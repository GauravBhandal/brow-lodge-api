import MeetingLogAttachmentModel from "./meetingLogAttachment.model";
import {
  CreateBulkMeetingLogAttachmentProps,
  UpdateBulkMeetingLogAttachmentProps,
  DeleteBulkMeetingLogAttachmentProps,
} from "./meetingLogAttachment.types";

class MeetingLogAttachmentService {
  async createBulkMeetingLogAttachment(
    props: CreateBulkMeetingLogAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const meetingLogAttachment = await MeetingLogAttachmentModel.bulkCreate(
      createProps
    );
    return meetingLogAttachment;
  }

  async updateBulkMeetingLogAttachment(
    props: UpdateBulkMeetingLogAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkMeetingLogAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const meetingLogAttachment = await this.createBulkMeetingLogAttachment(
      props
    );
    return meetingLogAttachment;
  }

  async deleteBulkMeetingLogAttachment(
    props: DeleteBulkMeetingLogAttachmentProps
  ) {
    const { relation } = props;
    await MeetingLogAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new MeetingLogAttachmentService();
