import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface Policy extends DefaultSchemaConfig {
  nextReviewDate?: Date;
  name: string;
  version: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreatePolicyProps {
  nextReviewDate: Policy["nextReviewDate"];
  name: Policy["name"];
  version: Policy["version"];
  company: Policy["company"];
  attachments?: Attachment["id"][];
}

export interface UpdatePolicyProps extends CreatePolicyProps {
  id: Policy["id"];
}

export interface DeletePolicyProps {
  id: Policy["id"];
  company: Policy["company"];
}

export interface GetPolicyByIdProps extends DeletePolicyProps {}

export interface GetPoliciesProps extends QueryParams {
  company: Policy["company"];
}
