import PolicyAttachmentModel from "./policyAttachment.model";
import {
  CreateBulkPolicyAttachmentProps,
  UpdateBulkPolicyAttachmentProps,
  DeleteBulkPolicyAttachmentProps,
} from "./policyAttachment.types";

class PolicyAttachmentService {
  async createBulkPolicyAttachment(props: CreateBulkPolicyAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const policyAttachment = await PolicyAttachmentModel.bulkCreate(
      createProps
    );
    return policyAttachment;
  }

  async updateBulkPolicyAttachment(props: UpdateBulkPolicyAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkPolicyAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const policyAttachment = await this.createBulkPolicyAttachment(props);
    return policyAttachment;
  }

  async deleteBulkPolicyAttachment(props: DeleteBulkPolicyAttachmentProps) {
    const { relation } = props;
    await PolicyAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new PolicyAttachmentService();
