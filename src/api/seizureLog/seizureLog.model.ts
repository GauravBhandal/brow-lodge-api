import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { SeizureLog, CreateSeizureLogProps } from "./seizureLog.types";

class SeizureLogModel<
    ModelAttributes = SeizureLog,
    ModelCreationAttributes = CreateSeizureLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements SeizureLog
{
  date!: SeizureLog["date"];
  startTime!: SeizureLog["startTime"];
  endTime!: SeizureLog["endTime"];
  seizure!: SeizureLog["seizure"];
  recovery!: SeizureLog["recovery"];
  comments: SeizureLog["comments"];
  staff!: SeizureLog["staff"];
  Staff: SeizureLog["Staff"];
  client!: SeizureLog["client"];
  Client: SeizureLog["Client"];
  company!: SeizureLog["company"];
  Company: SeizureLog["Company"];
}

modelManager.init(
  "SeizureLog",
  SeizureLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    seizure: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recovery: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "seizure_logs",
  }
);

export default SeizureLogModel;