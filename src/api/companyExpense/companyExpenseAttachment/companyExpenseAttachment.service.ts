import CompanyExpenseAttachmentModel from "./companyExpenseAttachment.model";
import {
  CreateBulkCompanyExpenseAttachmentProps,
  UpdateBulkCompanyExpenseAttachmentProps,
  DeleteBulkCompanyExpenseAttachmentProps,
} from "./companyExpenseAttachment.types";

class CompanyExpenseAttachmentService {
  async createBulkCompanyExpenseAttachment(
    props: CreateBulkCompanyExpenseAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const companyExpenseAttachment =
      await CompanyExpenseAttachmentModel.bulkCreate(createProps);
    return companyExpenseAttachment;
  }

  async updateBulkCompanyExpenseAttachment(
    props: UpdateBulkCompanyExpenseAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkCompanyExpenseAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const companyExpenseAttachment =
      await this.createBulkCompanyExpenseAttachment(props);
    return companyExpenseAttachment;
  }

  async deleteBulkCompanyExpenseAttachment(
    props: DeleteBulkCompanyExpenseAttachmentProps
  ) {
    const { relation } = props;
    await CompanyExpenseAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new CompanyExpenseAttachmentService();
