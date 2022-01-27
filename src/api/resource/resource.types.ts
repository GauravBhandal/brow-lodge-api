import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";
import { Attachment } from "../attachment";

export interface Resource extends DefaultSchemaConfig {
  date: Date;
  collectionTypes?: Record<string, object>;
  type: string;
  title: string;
  text?: string;
  link?: string;
  attachment?: Attachment["id"];
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateResourceProps {
  date: Resource["date"];
  collectionTypes?: Resource["collectionTypes"];
  type: Resource["type"];
  title: Resource["title"];
  text?: Resource["text"];
  link?: Resource["link"];
  attachment?: Attachment["id"];
  staff: Resource["staff"];
  company: Resource["company"];
}

export interface UpdateResourceProps extends CreateResourceProps {
  id: Resource["id"];
}

export interface DeleteResourceProps {
  id: Resource["id"];
  company: Resource["company"];
}

export interface GetResourceByIdProps extends DeleteResourceProps {}

export interface GetResourcesProps extends QueryParams {
  company: Resource["company"];
}
