import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Expenses } from "../../expenses";
import { Attachment } from "../../attachment";

export interface ExpensesAttachment extends DefaultSchemaConfig {
  relation: Expenses["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkExpensesAttachmentProps {
  relation: ExpensesAttachment["relation"];
  attachments: ExpensesAttachment["attachment"][];
}

export interface UpdateBulkExpensesAttachmentProps
  extends CreateBulkExpensesAttachmentProps {}

export interface DeleteBulkExpensesAttachmentProps {
  relation: ExpensesAttachment["relation"];
}
