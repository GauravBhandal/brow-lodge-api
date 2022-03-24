import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface CompanyExpense extends DefaultSchemaConfig {
  date: Date;
  totalCost: Number;
  description?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateCompanyExpenseProps {
  date: CompanyExpense["date"];
  totalCost: CompanyExpense["totalCost"];
  description: CompanyExpense["description"];
  staff: CompanyExpense["staff"];
  company: CompanyExpense["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateCompanyExpenseProps extends CreateCompanyExpenseProps {
  id: CompanyExpense["id"];
}

export interface DeleteCompanyExpenseProps {
  id: CompanyExpense["id"];
  company: CompanyExpense["company"];
}

export interface GetCompanyExpenseByIdProps extends DeleteCompanyExpenseProps {}

export interface GetCompanyExpensesProps extends QueryParams {
  company: CompanyExpense["company"];
}
