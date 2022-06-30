import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { PracticeGuide, CreatePracticeGuideProps } from "./practiceGuide.types";

class PracticeGuideModel<
    ModelAttributes = PracticeGuide,
    ModelCreationAttributes = CreatePracticeGuideProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PracticeGuide
{
  nextReviewDate: PracticeGuide["nextReviewDate"];
  name!: PracticeGuide["name"];
  version!: PracticeGuide["version"];
  company!: PracticeGuide["company"];
  Company: PracticeGuide["Company"];
  Attachments: PracticeGuide["Attachments"];
}

modelManager.init(
  "PracticeGuide",
  PracticeGuideModel,
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "practice_guides",
  }
);

export default PracticeGuideModel;
