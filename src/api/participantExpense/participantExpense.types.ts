import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface ParticipantExpense extends DefaultSchemaConfig {
  date: Date;
  totalExpense: Number;
  description?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateParticipantExpenseProps {
  date: ParticipantExpense["date"];
  totalExpense: ParticipantExpense["totalExpense"];
  description: ParticipantExpense["description"];
  staff: ParticipantExpense["staff"];
  client: ParticipantExpense["client"];
  company: ParticipantExpense["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateParticipantExpenseProps extends CreateParticipantExpenseProps {
  id: ParticipantExpense["id"];
}

export interface DeleteParticipantExpenseProps {
  id: ParticipantExpense["id"];
  company: ParticipantExpense["company"];
}

export interface GetParticipantExpenseByIdProps extends DeleteParticipantExpenseProps {}

export interface GetParticipantExpensesProps extends QueryParams {
  company: ParticipantExpense["company"];
}
