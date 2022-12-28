import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { ClientProfile } from "../clientProfile";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface ContinuousImprovement extends DefaultSchemaConfig {
  date: Date;
  source: string;
  improvement: string;
  action: string;
  status: string;
  dueDate?: Date;
  nextReviewDate?: Date;
  comments?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
  archived?: boolean;
}

export interface CreateContinuousImprovementProps {
  date: ContinuousImprovement["date"];
  source: ContinuousImprovement["source"];
  improvement: ContinuousImprovement["improvement"];
  action: ContinuousImprovement["action"];
  status: ContinuousImprovement["status"];
  dueDate: ContinuousImprovement["dueDate"];
  nextReviewDate: ContinuousImprovement["nextReviewDate"];
  comments: ContinuousImprovement["comments"];
  staff: ContinuousImprovement["staff"];
  company: ContinuousImprovement["company"];
}

export interface UpdateContinuousImprovementProps
  extends CreateContinuousImprovementProps {
  id: ContinuousImprovement["id"];
}

export interface DeleteContinuousImprovementProps {
  id: ContinuousImprovement["id"];
  company: ContinuousImprovement["company"];
}

export interface GetContinuousImprovementByIdProps
  extends DeleteContinuousImprovementProps {}

export interface GetContinuousImprovementsProps extends QueryParams {
  company: ContinuousImprovement["company"];
}
