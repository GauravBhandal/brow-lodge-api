import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { OnCallLog, CreateOnCallLogProps } from "./onCallLog.types";

class OnCallLogModel<
    ModelAttributes = OnCallLog,
    ModelCreationAttributes = CreateOnCallLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements OnCallLog
{
  date!: OnCallLog["date"];
  time!: OnCallLog["time"];
  duration!: OnCallLog["duration"];
  communicationWith!: OnCallLog["communicationWith"];
  description!: OnCallLog["description"];
  actions: OnCallLog["actions"];
  followup: OnCallLog["followup"];
  staff!: OnCallLog["staff"];
  Staff: OnCallLog["Staff"];
  client: OnCallLog["client"];
  Client: OnCallLog["Client"];
  company!: OnCallLog["company"];
  Company: OnCallLog["Company"];
  archived: OnCallLog["archived"];
}

modelManager.init(
  "OnCallLog",
  OnCallLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    duration: { type: Sequelize.STRING, allowNull: false },
    communicationWith: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    actions: { type: Sequelize.STRING },
    followup: { type: Sequelize.STRING },
    archived: { type: Sequelize.BOOLEAN },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "on_call_logs",
  }
);

export default OnCallLogModel;
