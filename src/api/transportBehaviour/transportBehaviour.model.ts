import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  TransportBehaviour,
  CreateTransportBehaviourProps,
} from "./transportBehaviour.types";

class TransportBehaviourModel<
    ModelAttributes = TransportBehaviour,
    ModelCreationAttributes = CreateTransportBehaviourProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TransportBehaviour
{
  date!: TransportBehaviour["date"];
  startTime!: TransportBehaviour["startTime"];
  endTime!: TransportBehaviour["endTime"];
  purposeOfTheJourney!: TransportBehaviour["purposeOfTheJourney"];
  explainBehaviour!: TransportBehaviour["explainBehaviour"];
  actionsTaken!: TransportBehaviour["actionsTaken"];
  responseToActions!: TransportBehaviour["responseToActions"];
  staff!: TransportBehaviour["staff"];
  Staff: TransportBehaviour["Staff"];
  client!: TransportBehaviour["client"];
  Client: TransportBehaviour["Client"];
  company!: TransportBehaviour["company"];
  Company: TransportBehaviour["Company"];
}

modelManager.init(
  "TransportBehaviour",
  TransportBehaviourModel,
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
    purposeOfTheJourney: {
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
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "transport_behaviours",
  }
);

export default TransportBehaviourModel;
