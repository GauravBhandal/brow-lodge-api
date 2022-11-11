import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Process, CreateProcessProps } from "./process.types";

class ProcessModel<
    ModelAttributes = Process,
    ModelCreationAttributes = CreateProcessProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Process
{
  nextReviewDate: Process["nextReviewDate"];
  name!: Process["name"];
  version!: Process["version"];
  company!: Process["company"];
  Company: Process["Company"];
  Attachments: Process["Attachments"];
  archived: Process["archived"];
}

modelManager.init(
  "Process",
  ProcessModel,
  {
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
    tableName: "processes",
  }
);

export default ProcessModel;
