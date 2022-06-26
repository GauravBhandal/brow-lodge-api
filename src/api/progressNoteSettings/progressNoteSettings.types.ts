import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";

export interface ProgressNoteSettings extends DefaultSchemaConfig {
  customFields: any;
  company: Company["id"];
  Company?: Company;
}

export interface CreateProgressNoteSettingsProps {
  customFields: ProgressNoteSettings["customFields"];
  company: ProgressNoteSettings["company"];
}

export interface UpdateProgressNoteSettingsProps
  extends CreateProgressNoteSettingsProps {}

export interface GetProgressNoteSettingsProps {
  company: ProgressNoteSettings["company"];
}
