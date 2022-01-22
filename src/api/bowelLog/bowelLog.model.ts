import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { BowelLog, CreateBowelLogProps } from "./bowelLog.types";

class BowelLogModel<
    ModelAttributes = BowelLog,
    ModelCreationAttributes = CreateBowelLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements BowelLog
{
  date!: BowelLog["date"];
  time!: BowelLog["time"];
  status!: BowelLog["status"];
  type: BowelLog["type"];
  staff!: BowelLog["staff"];
  Staff: BowelLog["Staff"];
  client!: BowelLog["client"];
  Client: BowelLog["Client"];
  company!: BowelLog["company"];
  Company: BowelLog["Company"];
}

modelManager.init(
  "BowelLog",
  BowelLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "bowel_logs",
  }
);

export default BowelLogModel;
