import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface PracticeGuide extends DefaultSchemaConfig {
  nextReviewDate?: Date;
  name: string;
  version: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
}

export interface CreatePracticeGuideProps {
  nextReviewDate?: PracticeGuide["nextReviewDate"];
  name: PracticeGuide["name"];
  version: PracticeGuide["version"];
  company: PracticeGuide["company"];
  attachments?: Attachment["id"][];
}

export interface UpdatePracticeGuideProps extends CreatePracticeGuideProps {
  id: PracticeGuide["id"];
}

export interface DeletePracticeGuideProps {
  id: PracticeGuide["id"];
  company: PracticeGuide["company"];
}

export interface GetPracticeGuideByIdProps extends DeletePracticeGuideProps {}

export interface GetPracticeGuidesProps extends QueryParams {
  company: PracticeGuide["company"];
}
