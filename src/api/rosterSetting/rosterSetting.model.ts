import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { RosterSetting, CreateRosterSettingProps } from "./rosterSetting.types";

class RosterSettingModel<
    ModelAttributes = RosterSetting,
    ModelCreationAttributes = CreateRosterSettingProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RosterSetting
{
  settings!: RosterSetting["settings"];
  company!: RosterSetting["company"];
  Company: RosterSetting["Company"];
}

modelManager.init(
  "RosterSetting",
  RosterSettingModel,
  {
    settings: {
      type: Sequelize.JSONB,
      allowNull: false,
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
    tableName: "roster_setting",
  }
);

export default RosterSettingModel;
