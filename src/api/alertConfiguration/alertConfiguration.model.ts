import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { AlertConfiguration, CreateAlertConfigurationProps } from "./alertConfiguration.types";

class AlertConfigurationModel<
    ModelAttributes = AlertConfiguration,
    ModelCreationAttributes = CreateAlertConfigurationProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements AlertConfiguration
{
  name!: AlertConfiguration["name"];
  description!: AlertConfiguration["description"];
  permissions!: AlertConfiguration["permissions"];
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
    description: {
      type: Sequelize.STRING,
    },
    permissions: {
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
    paranoid: true,
    tableName: "alertConfigurations",
  }
);

export default AlertConfigurationModel;
