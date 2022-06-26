import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ProgressNoteSettings,
  CreateProgressNoteSettingsProps,
} from "./progressNoteSettings.types";

class ProgressNoteSettingsModel<
    ModelAttributes = ProgressNoteSettings,
    ModelCreationAttributes = CreateProgressNoteSettingsProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressNoteSettings
{
  customFields!: ProgressNoteSettings["customFields"];
  company!: ProgressNoteSettings["company"];
  Company: ProgressNoteSettings["Company"];
}

modelManager.init(
  "ProgressNoteSettings",
  ProgressNoteSettingsModel,
  {
    customFields: {
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

export default ProgressNoteSettingsModel;
