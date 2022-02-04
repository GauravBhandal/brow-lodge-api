import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { WhsLog, CreateWhsLogProps } from "./whsLog.types";

class WhsLogModel<
    ModelAttributes = WhsLog,
    ModelCreationAttributes = CreateWhsLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements WhsLog
{
  date!: WhsLog["date"];
  category!: WhsLog["category"];
  location: WhsLog["location"];
  nextReviewDate: WhsLog["nextReviewDate"];
  comments: WhsLog["comments"];
  staff!: WhsLog["staff"];
  Staff: WhsLog["Staff"];
  company!: WhsLog["company"];
  Company: WhsLog["Company"];
  Attachments: WhsLog["Attachments"];
}

modelManager.init(
  "WhsLog",
  WhsLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
    },
    nextReviewDate: {
      type: Sequelize.DATE,
    },
    comments: {
      type: Sequelize.STRING,
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
    tableName: "whs_logs",
  }
);

export default WhsLogModel;
