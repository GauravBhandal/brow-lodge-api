import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface WhsLog extends DefaultSchemaConfig {
  date: Date;
  nextReviewDate?: Date;
  category: string;
  location: string;
  comments?: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreateWhsLogProps {
  date: WhsLog["date"];
  nextReviewDate: WhsLog["nextReviewDate"];
  category: WhsLog["category"];
  location: WhsLog["location"];
  comments: WhsLog["comments"];
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
