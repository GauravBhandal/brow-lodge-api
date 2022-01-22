import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface WhoLog extends DefaultSchemaConfig {
  date: Date;
  category: string;
  location?: string;
  nextReviewDate?: string;
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateWhoLogProps {
  date: WhoLog["date"];
  category: WhoLog["category"];
  location: WhoLog["location"];
  nextReviewDate: WhoLog["nextReviewDate"];
  comments: WhoLog["comments"];
  staff: WhoLog["staff"];
  company: WhoLog["company"];
}

export interface UpdateWhoLogProps extends CreateWhoLogProps {
  id: WhoLog["id"];
}

export interface DeleteWhoLogProps {
  id: WhoLog["id"];
  company: WhoLog["company"];
}

export interface GetWhoLogByIdProps extends DeleteWhoLogProps {}

export interface GetWhoLogsProps extends QueryParams {
  company: WhoLog["company"];
}
