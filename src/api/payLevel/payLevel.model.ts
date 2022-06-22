import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { PayLevel, CreatePayLevelProps } from "./payLevel.types";

class PayLevelModel<
    ModelAttributes = PayLevel,
    ModelCreationAttributes = CreatePayLevelProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PayLevel
{
  name!: PayLevel["name"];
  company!: PayLevel["company"];
  Company: PayLevel["Company"];
}

modelManager.init(
  "PayLevel",
  PayLevelModel,
  {
    name: {
      type: Sequelize.STRING,
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
    paranoid: false, // This is intentional, we don't need to soft delete pay levels
    tableName: "pay_levels",
  }
);

export default PayLevelModel;
