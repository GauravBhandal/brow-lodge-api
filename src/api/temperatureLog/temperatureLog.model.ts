import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  TemperatureLog,
  CreateTemperatureLogProps,
} from "./temperatureLog.types";

class TemperatureLogModel<
    ModelAttributes = TemperatureLog,
    ModelCreationAttributes = CreateTemperatureLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TemperatureLog
{
  date!: TemperatureLog["date"];
  time!: TemperatureLog["time"];
  reading!: TemperatureLog["reading"];
  comments: TemperatureLog["comments"];
  staff!: TemperatureLog["staff"];
  Staff: TemperatureLog["Staff"];
  client!: TemperatureLog["client"];
  Client: TemperatureLog["Client"];
  company!: TemperatureLog["company"];
  Company: TemperatureLog["Company"];
}

modelManager.init(
  "TemperatureLog",
  TemperatureLogModel,
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "temperature_logs",
  }
);

export default TemperatureLogModel;
