import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";
import { StaffDocumentCategory } from "../staffDocumentCategory";

export interface StaffDocumentType extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
  category: StaffDocumentCategory["id"];
  Category?: StaffDocumentCategory;
}

export interface CreateStaffDocumentTypeProps {
  name: StaffDocumentType["name"];
  company: StaffDocumentType["company"];
  category: StaffDocumentType["category"];
}

export interface UpdateStaffDocumentTypeProps
  extends CreateStaffDocumentTypeProps {
  id: StaffDocumentType["id"];
}

export interface DeleteStaffDocumentTypeProps {
  id: StaffDocumentType["id"];
  company: StaffDocumentType["company"];
}

export interface GetStaffDocumentTypeByIdProps
  extends DeleteStaffDocumentTypeProps {}

export interface GetStaffDocumentTypesProps extends QueryParams {
  company: StaffDocumentType["company"];
}
