import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";
import { GetPracticeGuideByIdProps } from "../practiceGuide/practiceGuide.types";

export interface Expense extends DefaultSchemaConfig {
  date: Date;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client?: ClientProfile["id"];
  Client?: ClientProfile;
  totalExpense: Number;
  description: string;
  Attachments: Attachment[];
  paidBy: string;
  status: string;
  paymentReimbursed: string;
  company: Company["id"];
  Company?: Company;
  
}

export interface CreateExpenseProps {
  date: Expense["date"];
  staff: Expense["staff"];
  client?: Expense["client"];
  totalExpense: Expense["totalExpense"];
  description: Expense["description"];
  attachments: Attachment["id"][];
  paidBy: Expense["paidBy"];
  status: Expense["status"];
  paymentReimbursed: Expense["paymentReimbursed"];
  company: Expense["company"];
 
}

export interface UpdateExpenseProps
  extends CreateExpenseProps {
  id: Expense["id"];
}

export interface DeleteExpenseProps {
  id: Expense["id"];
  company: Expense["company"];
}

export interface GetExpenseByIdProps
  extends DeleteExpenseProps {}

export interface GetExpensesProps extends QueryParams {
  company: Expense["company"];
}
