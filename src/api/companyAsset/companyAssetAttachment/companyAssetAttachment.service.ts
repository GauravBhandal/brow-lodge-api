import CompanyAssetAttachmentModel from "./companyAssetAttachment.model";
import {
  CreateBulkCompanyAssetAttachmentProps,
  UpdateBulkCompanyAssetAttachmentProps,
  DeleteBulkCompanyAssetAttachmentProps,
} from "./companyAssetAttachment.types";

class CompanyAssetAttachmentService {
  async createBulkCompanyAssetAttachment(
    props: CreateBulkCompanyAssetAttachmentProps
  ) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const companyAssetAttachment = await CompanyAssetAttachmentModel.bulkCreate(
      createProps
    );
    return companyAssetAttachment;
  }

  async updateBulkCompanyAssetAttachment(
    props: UpdateBulkCompanyAssetAttachmentProps
  ) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkCompanyAssetAttachment({
      relation: props.relation,
    });

    // Then assign the new attachments to the given relation
    const companyAssetAttachment = await this.createBulkCompanyAssetAttachment(
      props
    );
    return companyAssetAttachment;
  }

  async deleteBulkCompanyAssetAttachment(
    props: DeleteBulkCompanyAssetAttachmentProps
  ) {
    const { relation } = props;
    await CompanyAssetAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new CompanyAssetAttachmentService();
