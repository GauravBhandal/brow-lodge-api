import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Integration, CreateIntegrationProps } from "./integration.types";

class IntegrationModel<
    ModelAttributes = Integration,
    ModelCreationAttributes = CreateIntegrationProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Integration
{
  name!: Integration["name"];
  key!: Integration["key"];
  meta!: Integration["meta"];
  company!: Integration["company"];
  Company: Integration["Company"];
}

modelManager.init(
  "Integration",
  IntegrationModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    meta: {
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
    paranoid: false, // This is intentional, we don't need to soft delete integrations
    tableName: "integrations",
  }
);

export default IntegrationModel;
