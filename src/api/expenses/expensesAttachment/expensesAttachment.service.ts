import ExpensesAttachmentModel from "./expensesAttachment.model";
import {
  CreateBulkExpensesAttachmentProps,
  UpdateBulkExpensesAttachmentProps,
  DeleteBulkExpensesAttachmentProps,
} from "./expensesAttachment.types";

class ExpensesAttachmentService {
  async createBulkExpensesAttachment(props: CreateBulkExpensesAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const expensesAttachment = await ExpensesAttachmentModel.bulkCreate(
      createProps
    );
    return expensesAttachment;
  }

  async updateBulkExpensesAttachment(props: UpdateBulkExpensesAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkExpensesAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const expensesAttachment = await this.createBulkExpensesAttachment(props);
    return expensesAttachment;
  }

  async deleteBulkExpensesAttachment(props: DeleteBulkExpensesAttachmentProps) {
    const { relation } = props;
    await ExpensesAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ExpensesAttachmentService();
