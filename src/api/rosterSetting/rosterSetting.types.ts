import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface RosterSetting extends DefaultSchemaConfig {
  settings: Record<string, object>;
  company: Company["id"];
  Company?: Company;
}

export interface CreateRosterSettingProps {
  settings: RosterSetting["settings"];
  company: RosterSetting["company"];
}
export interface UpdateRosterSettingProps {
  company: RosterSetting["company"];
  settings: RosterSetting["settings"];
}

export interface GetRosterSettingByIdProps {
  company: RosterSetting["company"];
}
