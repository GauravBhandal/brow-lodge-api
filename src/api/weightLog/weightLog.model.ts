import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { WeightLog, CreateWeightLogProps } from "./weightLog.types";

class WeightLogModel<
    ModelAttributes = WeightLog,
    ModelCreationAttributes = CreateWeightLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements WeightLog
{
  date!: WeightLog["date"];
  time!: WeightLog["time"];
  reading!: WeightLog["reading"];
  comments: WeightLog["comments"];
  staff!: WeightLog["staff"];
  Staff: WeightLog["Staff"];
  client!: WeightLog["client"];
  Client: WeightLog["Client"];
  company!: WeightLog["company"];
  Company: WeightLog["Company"];
  archived: WeightLog["archived"];
}

modelManager.init(
  "WeightLog",
  WeightLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    reading: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    comments: {
      type: Sequelize.STRING,
    },
    archived: {
      type: Sequelize.BOOLEAN,
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
    tableName: "weight_logs",
  }
);

export default WeightLogModel;
