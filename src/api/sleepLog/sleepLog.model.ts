import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { SleepLog, CreateSleepLogProps } from "./sleepLog.types";

class SleepLogModel<
    ModelAttributes = SleepLog,
    ModelCreationAttributes = CreateSleepLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements SleepLog
{
  date!: SleepLog["date"];
  time!: SleepLog["time"];
  activity!: SleepLog["activity"];
  comments: SleepLog["comments"];
  staff!: SleepLog["staff"];
  Staff: SleepLog["Staff"];
  client!: SleepLog["client"];
  Client: SleepLog["Client"];
  company!: SleepLog["company"];
  Company: SleepLog["Company"];
  archived: SleepLog["archived"];
}

modelManager.init(
  "SleepLog",
  SleepLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    activity: {
      type: Sequelize.STRING,
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
    tableName: "sleep_logs",
  }
);

export default SleepLogModel;
