import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface WhsLog extends DefaultSchemaConfig {
  date: Date;
  category: string;
  location?: string;
  nextReviewDate?: string;
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateWhsLogProps {
  date: WhsLog["date"];
  category: WhsLog["category"];
  location: WhsLog["location"];
  nextReviewDate: WhsLog["nextReviewDate"];
  comments: WhsLog["comments"];
  staff: WhsLog["staff"];
  company: WhsLog["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateWhsLogProps extends CreateWhsLogProps {
  id: WhsLog["id"];
}

export interface DeleteWhsLogProps {
  id: WhsLog["id"];
  company: WhsLog["company"];
}

export interface GetWhsLogByIdProps extends DeleteWhsLogProps {}

export interface GetWhsLogsProps extends QueryParams {
  company: WhsLog["company"];
}
