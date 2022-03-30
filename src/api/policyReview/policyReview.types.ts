import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Policy } from "../policy";
import { StaffProfile } from "../staffProfile";
import { Attachment } from "../attachment";

export interface PolicyReview extends DefaultSchemaConfig {
  reasonForUpdate: string;
  consultationWith: string;
  staffEducationCompleted: string;
  version: string;
  date: Date;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  policy: Policy["id"];
  Policy?: Policy;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreatePolicyReviewProps {
  version: PolicyReview["version"];
  staffEducationCompleted: PolicyReview["staffEducationCompleted"];
  consultationWith: PolicyReview["consultationWith"];
  reasonForUpdate: PolicyReview["reasonForUpdate"];
  date: PolicyReview["date"];
  staff: PolicyReview["staff"];
  policy: PolicyReview["policy"];
  company: PolicyReview["company"];
  attachments: Attachment["id"][];
}

export interface UpdatePolicyReviewProps extends CreatePolicyReviewProps {
  id: PolicyReview["id"];
}

export interface DeletePolicyReviewProps {
  id: PolicyReview["id"];
  company: PolicyReview["company"];
}

export interface GetPolicyReviewByIdProps extends DeletePolicyReviewProps {}

export interface GetPolicyReviewByPolicyProps {
  policy: PolicyReview["policy"];
  company: PolicyReview["company"];
}
export interface GetPolicyReviewsProps extends QueryParams {
  company: PolicyReview["company"];
}
