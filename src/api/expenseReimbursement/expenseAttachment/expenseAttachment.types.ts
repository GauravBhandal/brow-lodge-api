import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { ExpenseReimbursement } from "../../expenseReimbursement";
import { Attachment } from "../../attachment";

export interface ExpenseAttachment extends DefaultSchemaConfig {
  relation: ExpenseReimbursement["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkExpenseAttachmentProps {
  relation: ExpenseAttachment["relation"];
  attachments: ExpenseAttachment["attachment"][];
}

export interface UpdateBulkExpenseAttachmentProps
  extends CreateBulkExpenseAttachmentProps {}

export interface DeleteBulkExpenseAttachmentProps {
  relation: ExpenseAttachment["relation"];
}
