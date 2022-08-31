import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ServiceDelivery,
  CreateServiceDeliveryProps,
} from "./serviceDelivery.types";

class ServiceDeliveryModel<
    ModelAttributes = ServiceDelivery,
    ModelCreationAttributes = CreateServiceDeliveryProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ServiceDelivery
{
  date!: ServiceDelivery["date"];
  startTime!: ServiceDelivery["startTime"];
  endTime!: ServiceDelivery["endTime"];
  notes!: ServiceDelivery["notes"];
  service!: ServiceDelivery["service"];
  Service: ServiceDelivery["Service"];
  staff!: ServiceDelivery["staff"];
  Staff: ServiceDelivery["Staff"];
  client!: ServiceDelivery["client"];
  Client: ServiceDelivery["Client"];
  company!: ServiceDelivery["company"];
  Company: ServiceDelivery["Company"];
  progressnote: ServiceDelivery["progressnote"];
  shift: ServiceDelivery["shift"];
}

modelManager.init(
  "ServiceDelivery",
  ServiceDeliveryModel,
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
    notes: {
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
    tableName: "service_deliveries",
  }
);

export default ServiceDeliveryModel;