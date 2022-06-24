import { DefaultSchemaConfig } from "../../components/sequelize/manager";
import { Company } from "../company";
import { QueryParams } from "../../common/types";

export interface ProgressNotesSetting extends DefaultSchemaConfig {
  customFieldData: any;
  company: Company["id"];
  Company?: Company;
}

export interface CreateProgressNotesSettingProps {
  customFieldData: ProgressNotesSetting["customFieldData"];
  company: ProgressNotesSetting["company"];
}

export interface UpdateProgressNotesSettingProps
  extends CreateProgressNotesSettingProps {
  id: ProgressNotesSetting["id"];
}

export interface DeleteProgressNotesSettingProps {
  id: ProgressNotesSetting["id"];
  company: ProgressNotesSetting["company"];
}

export interface GetProgressNotesSettingByIdProps
  extends DeleteProgressNotesSettingProps {}

export interface GetProgressNotesSettingsProps extends QueryParams {
  company: ProgressNotesSetting["company"];
}
