import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface MobileSetting extends DefaultSchemaConfig {
  settings?: { 
                allowClockInAndClockOutInRoster: boolean,
                isAttachmentRequired: boolean
              };
  company: Company["id"];
  Company?: Company;
}

export interface CreateMobileSettingProps {
  settings?: MobileSetting["settings"];
  company: MobileSetting["company"];
}

export interface UpdateMobileSettingProps extends CreateMobileSettingProps {}

export interface DeleteMobileSettingProps {
  company: MobileSetting["company"];
}

export interface GetMobileSettingsProps {
  company: MobileSetting["company"];
}
