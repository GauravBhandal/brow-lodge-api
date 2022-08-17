import ExpenseAttachmentModel from "./expenseAttachment.model";
import {
  CreateBulkExpenseAttachmentProps,
  UpdateBulkExpenseAttachmentProps,
  DeleteBulkExpenseAttachmentProps,
} from "./expenseAttachment.types";

class ExpenseAttachmentService {
  async createBulkExpenseAttachment(props: CreateBulkExpenseAttachmentProps) {
    const createProps = props.attachments.map((attachment) => ({
      relation: props.relation,
      attachment,
    }));

    const expenseAttachment = await ExpenseAttachmentModel.bulkCreate(
      createProps
    );
    return expenseAttachment;
  }

  async updateBulkExpenseAttachment(props: UpdateBulkExpenseAttachmentProps) {
    // Delete all the existing attachments for the given relation
    await this.deleteBulkExpenseAttachment({ relation: props.relation });

    // Then assign the new attachments to the given relation
    const expenseAttachment = await this.createBulkExpenseAttachment(props);
    return expenseAttachment;
  }

  async deleteBulkExpenseAttachment(props: DeleteBulkExpenseAttachmentProps) {
    const { relation } = props;
    await ExpenseAttachmentModel.destroy({
      where: {
        relation,
      },
    });
  }
}

export default new ExpenseAttachmentService();
