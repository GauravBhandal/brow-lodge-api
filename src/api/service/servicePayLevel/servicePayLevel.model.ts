import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ServicePayLevel,
  CreateBulkServicePayLevelProps,
} from "./servicePayLevel.types";

class ServicePayLevelModel<
    ModelAttributes = ServicePayLevel,
    ModelCreationAttributes = CreateBulkServicePayLevelProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ServicePayLevel
{
  paylevel!: ServicePayLevel["paylevel"];
  service!: ServicePayLevel["service"];
  payitem!: ServicePayLevel["payitem"];
  company!: ServicePayLevel["company"];
}

modelManager.init(
  "ServicePayLevel",
  ServicePayLevelModel,
  {
    paylevel: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    service: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    payitem: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    company: {
      type: Sequelize.UUIDV4,
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
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "services_pay_levels",
  }
);

export default ServicePayLevelModel;
