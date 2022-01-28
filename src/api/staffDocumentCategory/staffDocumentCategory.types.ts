import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffDocumentType } from "../staffDocumentType";
import { QueryParams } from "../../common/types";

export interface StaffDocumentCategory extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateStaffDocumentCategoryProps {
  name: StaffDocumentCategory["name"];
  types: StaffDocumentType["name"][];
  company: StaffDocumentCategory["company"];
}

export interface UpdateStaffDocumentCategoryProps
  extends CreateStaffDocumentCategoryProps {
  id: StaffDocumentCategory["id"];
}

export interface DeleteStaffDocumentCategoryProps {
  id: StaffDocumentCategory["id"];
  company: StaffDocumentCategory["company"];
}

export interface GetStaffDocumentCategoryByIdProps
  extends DeleteStaffDocumentCategoryProps {}

export interface GetStaffDocumentCategorysProps extends QueryParams {
  company: StaffDocumentCategory["company"];
}
