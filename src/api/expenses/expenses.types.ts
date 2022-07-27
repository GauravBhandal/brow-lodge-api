import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";
import { GetPracticeGuideByIdProps } from "../practiceGuide/practiceGuide.types";

export interface Expenses extends DefaultSchemaConfig {
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

export interface CreateExpensesProps {
  date: Expenses["date"];
  staff: Expenses["staff"];
  client?: Expenses["client"];
  totalExpense: Expenses["totalExpense"];
  description: Expenses["description"];
  attachments: Attachment["id"][];
  paidBy: Expenses["paidBy"];
  status: Expenses["status"];
  paymentReimbursed: Expenses["paymentReimbursed"];
  company: Expenses["company"];
 
}

export interface UpdateExpensesProps
  extends CreateExpensesProps {
  id: Expenses["id"];
}

export interface DeleteExpensesProps {
  id: Expenses["id"];
  company: Expenses["company"];
}

export interface GetExpensesByIdProps
  extends DeleteExpensesProps {}

export interface GetExpensessProps extends QueryParams {
  company: Expenses["company"];
}
