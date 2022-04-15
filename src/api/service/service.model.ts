import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Service, CreateServiceProps } from "./service.types";

class ServiceModel<
    ModelAttributes = Service,
    ModelCreationAttributes = CreateServiceProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Service
{
  code!: Service["code"];
  name!: Service["name"];
  effectiveDate!: Service["effectiveDate"];
  company!: Service["company"];
  Company: Service["Company"];
}

modelManager.init(
  "Service",
  ServiceModel,
  {
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    effectiveDate: {
      type: Sequelize.DATE,
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
    tableName: "services",
  }
);

export default ServiceModel;
