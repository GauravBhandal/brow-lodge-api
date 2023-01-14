import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  BloodPressureLog,
  CreateBloodPressureLogProps,
} from "./bloodPressureLog.types";

class BloodPressureLogModel<
    ModelAttributes = BloodPressureLog,
    ModelCreationAttributes = CreateBloodPressureLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements BloodPressureLog
{
  date!: BloodPressureLog["date"];
  time!: BloodPressureLog["time"];
  upper!: BloodPressureLog["upper"];
  lower!: BloodPressureLog["lower"];
  pulse!: BloodPressureLog["pulse"];
  comments: BloodPressureLog["comments"];
  staff!: BloodPressureLog["staff"];
  Staff: BloodPressureLog["Staff"];
  client!: BloodPressureLog["client"];
  Client: BloodPressureLog["Client"];
  company!: BloodPressureLog["company"];
  Company: BloodPressureLog["Company"];
  archived: BloodPressureLog["archived"];
}

modelManager.init(
  "BloodPressureLog",
  BloodPressureLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    upper: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    lower: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    pulse: {
      type: Sequelize.NUMBER,
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
    tableName: "blood_pressure_logs",
  }
);

export default BloodPressureLogModel;
