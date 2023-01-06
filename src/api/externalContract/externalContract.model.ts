import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ExternalContract,
  CreateExternalContractProps,
} from "./externalContract.types";

class ExternalContractModel<
    ModelAttributes = ExternalContract,
    ModelCreationAttributes = CreateExternalContractProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ExternalContract
{
  date!: ExternalContract["date"];
  nextReviewDate: ExternalContract["nextReviewDate"];
  notes: ExternalContract["notes"];
  name!: ExternalContract["name"];
  staff!: ExternalContract["staff"];
  Staff: ExternalContract["Staff"];
  company!: ExternalContract["company"];
  Company: ExternalContract["Company"];
  Attachments!: ExternalContract["Attachments"];
  archived: ExternalContract["archived"];
}

modelManager.init(
  "ExternalContract",
  ExternalContractModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    nextReviewDate: {
      type: Sequelize.DATE,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
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
    tableName: "external_contracts",
  }
);

export default ExternalContractModel;
