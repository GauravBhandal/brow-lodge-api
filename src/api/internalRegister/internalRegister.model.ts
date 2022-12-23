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
  nextReviewDate: InternalRegister["nextReviewDate"];
  version!: InternalRegister["version"];
  company!: InternalRegister["company"];
  Company: InternalRegister["Company"];
  Attachments: InternalRegister["Attachments"];
  archived: InternalRegister["archived"];
}

modelManager.init(
  "InternalRegister",
  InternalRegisterModel,
  {
    notes: {
      type: Sequelize.STRING,
    },
    nextReviewDate: { type: Sequelize.DATE },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    version: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    archived: {
      type: Sequelize.BOOLEAN,
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
