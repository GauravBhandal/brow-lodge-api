import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { MobileSetting, CreateMobileSettingProps } from "./mobileSetting.types";

class MobileSettingModel<
    ModelAttributes = MobileSetting,
    ModelCreationAttributes = CreateMobileSettingProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements MobileSetting
{
  transport!: MobileSetting["transport"];
  company!: MobileSetting["company"];
  Company: MobileSetting["Company"];
}

modelManager.init(
  "MobileSetting",
  MobileSettingModel,
  {
    transport: {
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
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "mobile_settings",
  }
);

export default MobileSettingModel;
