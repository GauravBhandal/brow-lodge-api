import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ContinuousImprovement,
  CreateContinuousImprovementProps,
} from "./continuousImprovement.types";

class ContinuousImprovementModel<
    ModelAttributes = ContinuousImprovement,
    ModelCreationAttributes = CreateContinuousImprovementProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ContinuousImprovement
{
  date!: ContinuousImprovement["date"];
  source!: ContinuousImprovement["source"];
  improvement!: ContinuousImprovement["improvement"];
  action!: ContinuousImprovement["action"];
  staff!: ContinuousImprovement["staff"];
  Staff: ContinuousImprovement["Staff"];
  status!: ContinuousImprovement["status"];
  dueDate: ContinuousImprovement["dueDate"];
  nextReviewDate: ContinuousImprovement["nextReviewDate"];
  comments: ContinuousImprovement["comments"];
  company!: ContinuousImprovement["company"];
  Company: ContinuousImprovement["Company"];
  archived: ContinuousImprovement["archived"];
}

modelManager.init(
  "ContinuousImprovement",
  ContinuousImprovementModel,
  {
    date: { type: Sequelize.DATE, allowNull: false },
    source: { type: Sequelize.STRING, allowNull: false },
    improvement: { type: Sequelize.STRING, allowNull: false },
    action: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING, allowNull: false },
    dueDate: { type: Sequelize.DATE },
    nextReviewDate: { type: Sequelize.DATE },
    comments: { type: Sequelize.STRING },
    archived: { type: Sequelize.BOOLEAN },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "continuous_improvements",
  }
);

export default ContinuousImprovementModel;
