import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffDocumentCategory } from "../staffDocumentCategory";
import { StaffDocumentType } from "../staffDocumentType";
import { StaffProfile } from "../staffProfile";
import { Attachment } from "../attachment";

export interface StaffDocument extends DefaultSchemaConfig {
  comments?: string;
  hasExpiry: boolean;
  expiryDate?: Date;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  category: StaffDocumentCategory["id"];
  Category?: StaffDocumentCategory;
  type: StaffDocumentType["id"];
  Type?: StaffDocumentType;
  company: Company["id"];
  Company?: Company;
  Attachments?: Attachment[];
  archived?: boolean;
  notes?: string;
}

export interface CreateStaffDocumentProps {
  comments: StaffDocument["comments"];
  hasExpiry: StaffDocument["hasExpiry"];
  expiryDate: StaffDocument["expiryDate"];
  staff: StaffDocument["staff"];
  category: StaffDocument["category"];
  type: StaffDocument["type"];
  company: StaffDocument["company"];
  attachments: Attachment["id"][];
  notes: StaffDocument["notes"];
}

export interface UpdateStaffDocumentProps extends CreateStaffDocumentProps {
  id: StaffDocument["id"];
}

export interface DeleteStaffDocumentProps {
  id: StaffDocument["id"];
  company: StaffDocument["company"];
}

export interface GetStaffDocumentByIdProps extends DeleteStaffDocumentProps {}

export interface GetStaffDocumentByTypeProps {
  type: StaffDocument["type"];
  company: StaffDocument["company"];
}

export interface GetStaffDocumentByCategoryProps {
  category: StaffDocument["category"];
  company: StaffDocument["company"];
}
export interface GetStaffDocumentsProps extends QueryParams {
  company: StaffDocument["company"];
}
