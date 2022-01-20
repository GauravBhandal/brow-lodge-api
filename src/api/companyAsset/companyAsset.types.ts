import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { QueryParams } from "../../common/types";

export interface CompanyAsset extends DefaultSchemaConfig {
  date: Date;
  assetName: string;
  location: string;
  description?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateCompanyAssetProps {
  date: CompanyAsset["date"];
  assetName: CompanyAsset["assetName"];
  location: CompanyAsset["location"];
  description: CompanyAsset["description"];
  staff: CompanyAsset["staff"];
  company: CompanyAsset["company"];
}

export interface UpdateCompanyAssetProps extends CreateCompanyAssetProps {
  id: CompanyAsset["id"];
}

export interface DeleteCompanyAssetProps {
  id: CompanyAsset["id"];
  company: CompanyAsset["company"];
}

export interface GetCompanyAssetByIdProps extends DeleteCompanyAssetProps {}

export interface GetCompanyAssetsProps extends QueryParams {
  company: CompanyAsset["company"];
}
