import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ProgressNotesSetting,
  CreateProgressNotesSettingProps,
} from "./progressNotesSetting.types";

class ProgressNotesSettingModel<
    ModelAttributes = ProgressNotesSetting,
    ModelCreationAttributes = CreateProgressNotesSettingProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressNotesSetting
{
  customFieldData!: ProgressNotesSetting["customFieldData"];
  company!: ProgressNotesSetting["company"];
  Company: ProgressNotesSetting["Company"];
}

modelManager.init(
  "ProgressNotesSetting",
  ProgressNotesSettingModel,
  {
    customFieldData: {
      type: Sequelize.JSONB,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "progress_notes_settings",
  }
);

export default ProgressNotesSettingModel;
