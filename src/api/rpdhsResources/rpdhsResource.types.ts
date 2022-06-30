import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface RpdhsResource extends DefaultSchemaConfig {
  nextReviewDate?: Date;
  name: string;
  version: string;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
}

export interface CreateRpdhsResourceProps {
  nextReviewDate?: RpdhsResource["nextReviewDate"];
  name: RpdhsResource["name"];
  version: RpdhsResource["version"];
  company: RpdhsResource["company"];
  attachments?: Attachment["id"][];
}

export interface UpdateRpdhsResourceProps extends CreateRpdhsResourceProps {
  id: RpdhsResource["id"];
}

export interface DeleteRpdhsResourceProps {
  id: RpdhsResource["id"];
  company: RpdhsResource["company"];
}

export interface GetRpdhsResourceByIdProps extends DeleteRpdhsResourceProps {}

export interface GetRpdhsResourcesProps extends QueryParams {
  company: RpdhsResource["company"];
}
