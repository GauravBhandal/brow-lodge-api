import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface MobileSetting extends DefaultSchemaConfig {
  transport?: Record<string, any>; // TODO: Remove this any
  company: Company["id"];
  Company?: Company;
}

export interface CreateMobileSettingProps {
  transport?: MobileSetting["transport"];
  company: MobileSetting["company"];
}

export interface UpdateMobileSettingProps {
  company: MobileSetting["company"];
  payload: CreateMobileSettingProps[];
}

export interface DeleteMobileSettingProps {
  company: MobileSetting["company"];
}

export interface GetMobileSettingsProps {
  company: MobileSetting["company"];
}
