import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  InternalRegister,
  CreateInternalRegisterProps,
} from "./internalRegister.types";

class InternalRegisterModel<
    ModelAttributes = InternalRegister,
    ModelCreationAttributes = CreateInternalRegisterProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements InternalRegister
{
  notes: InternalRegister["notes"];
  name!: InternalRegister["name"];
  version!: InternalRegister["version"];
  company!: InternalRegister["company"];
  Company: InternalRegister["Company"];
  Attachments: InternalRegister["Attachments"];
}

modelManager.init(
  "InternalRegister",
  InternalRegisterModel,
  {
    notes: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    version: {
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
    tableName: "internal_registers",
  }
);

export default InternalRegisterModel;