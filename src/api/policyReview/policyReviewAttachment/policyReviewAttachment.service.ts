import PolicyReviewAttachmentModel from "./policyReviewAttachment.model";
import {
  CreateBulkPolicyReviewAttachmentProps,
  UpdateBulkPolicyReviewAttachmentProps,
  DeleteBulkPolicyReviewAttachmentProps,
} from "./policyReviewAttachment.types";

class PolicyReviewAttachmentService {
  async createBulkPolicyReviewAttachment(
    props: CreateBulkPolicyReviewAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const policyReviewAttachment = await PolicyReviewAttachmentModel.bulkCreate(
      createProps
    );
    return policyReviewAttachment;
  }

  async updateBulkPolicyReviewAttachment(
    props: UpdateBulkPolicyReviewAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkPolicyReviewAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const policyReviewAttachment = await this.createBulkPolicyReviewAttachment(
      props
    );
    return policyReviewAttachment;
  }

  async deleteBulkPolicyReviewAttachment(
    props: DeleteBulkPolicyReviewAttachmentProps
  ) {
    const { relation } = props;
    await PolicyReviewAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new PolicyReviewAttachmentService();
