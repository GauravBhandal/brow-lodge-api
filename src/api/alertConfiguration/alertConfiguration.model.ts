import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  AlertConfiguration,
  CreateAlertConfigurationProps,
} from "./alertConfiguration.types";

class AlertConfigurationModel<
    ModelAttributes = AlertConfiguration,
    ModelCreationAttributes = CreateAlertConfigurationProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements AlertConfiguration
{
  name!: AlertConfiguration["name"];
  transport!: AlertConfiguration["transport"];
  company!: AlertConfiguration["company"];
  Company: AlertConfiguration["Company"];
}

modelManager.init(
  "AlertConfiguration",
  AlertConfigurationModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    transport: {
      type: Sequelize.JSONB,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "alert_configurations",
  }
);

export default AlertConfigurationModel;
