import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { PrnBalanceLog, CreatePrnBalanceLogProps } from "./prnBalanceLog.types";

class PrnBalanceLogModel<
    ModelAttributes = PrnBalanceLog,
    ModelCreationAttributes = CreatePrnBalanceLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PrnBalanceLog
{
  date!: PrnBalanceLog["date"];
  time!: PrnBalanceLog["time"];
  name!: PrnBalanceLog["name"];
  balance!: PrnBalanceLog["balance"];
  staff!: PrnBalanceLog["staff"];
  Staff: PrnBalanceLog["Staff"];
  client!: PrnBalanceLog["client"];
  Client: PrnBalanceLog["Client"];
  company!: PrnBalanceLog["company"];
  Company: PrnBalanceLog["Company"];
}

modelManager.init(
  "PrnBalanceLog",
  PrnBalanceLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL,
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
    tableName: "prn_balance_logs",
  }
);

export default PrnBalanceLogModel;
