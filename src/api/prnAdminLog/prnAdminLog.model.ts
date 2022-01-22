import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { PrnAdminLog, CreatePrnAdminLogProps } from "./prnAdminLog.types";

class PrnAdminLogModel<
    ModelAttributes = PrnAdminLog,
    ModelCreationAttributes = CreatePrnAdminLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PrnAdminLog
{
  date!: PrnAdminLog["date"];
  time!: PrnAdminLog["time"];
  medication!: PrnAdminLog["medication"];
  dosage!: PrnAdminLog["dosage"];
  reason!: PrnAdminLog["reason"];
  outcome!: PrnAdminLog["outcome"];
  staff!: PrnAdminLog["staff"];
  Staff: PrnAdminLog["Staff"];
  client!: PrnAdminLog["client"];
  Client: PrnAdminLog["Client"];
  company!: PrnAdminLog["company"];
  Company: PrnAdminLog["Company"];
}

modelManager.init(
  "PrnAdminLog",
  PrnAdminLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    medication: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dosage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    outcome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "prn_admin_logs",
  }
);

export default PrnAdminLogModel;
