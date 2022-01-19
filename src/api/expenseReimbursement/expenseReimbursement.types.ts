import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface ExpenseReimbursement extends DefaultSchemaConfig {
  date: Date;
  totalCost: Number;
  description: string;
  comments?: string;
  status: "approved" | "pending" | "rejected";
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateExpenseReimbursementProps {
  date: ExpenseReimbursement["date"];
  totalCost: ExpenseReimbursement["totalCost"];
  description: ExpenseReimbursement["description"];
  comments: ExpenseReimbursement["comments"];
  status: ExpenseReimbursement["status"];
  staff: ExpenseReimbursement["staff"];
  client: ExpenseReimbursement["client"];
  company: ExpenseReimbursement["company"];
}

export interface UpdateExpenseReimbursementProps
  extends CreateExpenseReimbursementProps {
  id: ExpenseReimbursement["id"];
}

export interface DeleteExpenseReimbursementProps {
  id: ExpenseReimbursement["id"];
  company: ExpenseReimbursement["company"];
}

export interface GetExpenseReimbursementByIdProps
  extends DeleteExpenseReimbursementProps {}

export interface GetExpenseReimbursementsProps extends QueryParams {
  company: ExpenseReimbursement["company"];
}
