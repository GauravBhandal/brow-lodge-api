import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { WhoLog, CreateWhoLogProps } from "./whoLog.types";

class WhoLogModel<
    ModelAttributes = WhoLog,
    ModelCreationAttributes = CreateWhoLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements WhoLog
{
  date!: WhoLog["date"];
  category!: WhoLog["category"];
  location: WhoLog["location"];
  nextReviewDate: WhoLog["nextReviewDate"];
  comments: WhoLog["comments"];
  staff!: WhoLog["staff"];
  Staff: WhoLog["Staff"];
  company!: WhoLog["company"];
  Company: WhoLog["Company"];
}

modelManager.init(
  "WhoLog",
  WhoLogModel,
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
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "who_logs",
  }
);

export default WhoLogModel;
