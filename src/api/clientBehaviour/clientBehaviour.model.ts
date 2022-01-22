import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ClientBehaviour,
  CreateClientBehaviourProps,
} from "./clientBehaviour.types";

class ClientBehaviourModel<
    ModelAttributes = ClientBehaviour,
    ModelCreationAttributes = CreateClientBehaviourProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientBehaviour
{
  date!: ClientBehaviour["date"];
  startTime!: ClientBehaviour["startTime"];
  endTime!: ClientBehaviour["endTime"];
  whatHappenedBefore!: ClientBehaviour["whatHappenedBefore"];
  explainBehaviour!: ClientBehaviour["explainBehaviour"];
  actionsTaken!: ClientBehaviour["actionsTaken"];
  responseToActions!: ClientBehaviour["responseToActions"];
  staff!: ClientBehaviour["staff"];
  Staff: ClientBehaviour["Staff"];
  client!: ClientBehaviour["client"];
  Client: ClientBehaviour["Client"];
  company!: ClientBehaviour["company"];
  Company: ClientBehaviour["Company"];
}

modelManager.init(
  "ClientBehaviour",
  ClientBehaviourModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    whatHappenedBefore: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    explainBehaviour: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionsTaken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    responseToActions: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "client_behaviours",
  }
);

export default ClientBehaviourModel;
