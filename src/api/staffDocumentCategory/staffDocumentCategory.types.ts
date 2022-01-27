import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface StaffDocumentCategory extends DefaultSchemaConfig {
  name: string;
  company: Company["id"];
  Company?: Company;
}

export interface CreateStaffDocumentCategoryProps {
  name: StaffDocumentCategory["name"];
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
