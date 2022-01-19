import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { StaffProfile } from "../staffProfile";
import { ClientProfile } from "../clientProfile";
import { QueryParams } from "../../common/types";

export interface CompanyAsset extends DefaultSchemaConfig {
  date: Date;
  assetName: string;
  location: string;
  description?: string;
  staff: StaffProfile["id"];
  Staff?: StaffProfile;
  client: ClientProfile["id"];
  Client?: ClientProfile;
  company: Company["id"];
  Company?: Company;
}

export interface CreateCompanyAssetProps {
  date: CompanyAsset["date"];
  assetName: CompanyAsset["assetName"];
  location: CompanyAsset["location"];
  description: CompanyAsset["description"];
  staff: CompanyAsset["staff"];
  client: CompanyAsset["client"];
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
