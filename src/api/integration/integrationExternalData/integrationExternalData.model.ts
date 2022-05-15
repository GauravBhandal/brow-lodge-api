import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  IntegrationExternalData,
  CreateIntegrationExternalDataProps,
} from "./integrationExternalData.types";

class IntegrationExternalDataModel<
    ModelAttributes = IntegrationExternalData,
    ModelCreationAttributes = CreateIntegrationExternalDataProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements IntegrationExternalData
{
  type!: IntegrationExternalData["type"];
  data!: IntegrationExternalData["data"];
  integration!: IntegrationExternalData["integration"];
  Integration: IntegrationExternalData["Integration"];
  company!: IntegrationExternalData["company"];
  Company: IntegrationExternalData["Company"];
}

modelManager.init(
  "IntegrationExternalData",
  IntegrationExternalDataModel,
  {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data: {
      type: Sequelize.JSONB,
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
    paranoid: false, // This is intentional, we don't need to soft delete integrations_external_data
    tableName: "integrations_external_data",
  }
);

export default IntegrationExternalDataModel;
