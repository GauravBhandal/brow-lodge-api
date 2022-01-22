import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  BloodGlucoseLog,
  CreateBloodGlucoseLogProps,
} from "./bloodGlucoseLog.types";

class BloodGlucoseLogModel<
    ModelAttributes = BloodGlucoseLog,
    ModelCreationAttributes = CreateBloodGlucoseLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements BloodGlucoseLog
{
  date!: BloodGlucoseLog["date"];
  time!: BloodGlucoseLog["time"];
  reading!: BloodGlucoseLog["reading"];
  comments: BloodGlucoseLog["comments"];
  staff!: BloodGlucoseLog["staff"];
  Staff: BloodGlucoseLog["Staff"];
  client!: BloodGlucoseLog["client"];
  Client: BloodGlucoseLog["Client"];
  company!: BloodGlucoseLog["company"];
  Company: BloodGlucoseLog["Company"];
}

modelManager.init(
  "BloodGlucoseLog",
  BloodGlucoseLogModel,
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
    underscored: true,
    paranoid: true,
    tableName: "blood_glucose_logs",
  }
);

export default BloodGlucoseLogModel;
