import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Expense } from "..";
import { Attachment } from "../../attachment";

export interface ExpenseAttachment extends DefaultSchemaConfig {
  relation: Expense["id"];
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
