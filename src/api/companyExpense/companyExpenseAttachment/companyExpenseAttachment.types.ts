import { DefaultSchemaConfig } from "../../../components/sequelize/manager";
import { Attachment } from "../../attachment";
import { CompanyExpense } from "../companyExpense.types";

export interface CompanyExpenseAttachment extends DefaultSchemaConfig {
  relation: CompanyExpense["id"];
  attachment: Attachment["id"];
}

export interface CreateBulkCompanyExpenseAttachmentProps {
  relation: CompanyExpenseAttachment["relation"];
  attachments: CompanyExpenseAttachment["attachment"][];
}

export interface UpdateBulkCompanyExpenseAttachmentProps
  extends CreateBulkCompanyExpenseAttachmentProps {}

export interface DeleteBulkCompanyExpenseAttachmentProps {
  relation: CompanyExpenseAttachment["relation"];
}
