import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  RestrictivePracticeRegister,
  CreateRestrictivePracticeRegisterProps,
} from "./restrictivePracticeRegister.types";

class RestrictivePracticeRegisterModel<
    ModelAttributes = RestrictivePracticeRegister,
    ModelCreationAttributes = CreateRestrictivePracticeRegisterProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RestrictivePracticeRegister
{
  startDate!: RestrictivePracticeRegister["startDate"];
  endDate: RestrictivePracticeRegister["endDate"];
  startTime!: RestrictivePracticeRegister["startTime"];
  endTime: RestrictivePracticeRegister["endTime"];
  typeOfRestrictivePractice!: RestrictivePracticeRegister["typeOfRestrictivePractice"];
  description!: RestrictivePracticeRegister["description"];
  administrationType!: RestrictivePracticeRegister["administrationType"];
  behaviourOfConcerns!: RestrictivePracticeRegister["behaviourOfConcerns"];
  isAuthorised!: RestrictivePracticeRegister["isAuthorised"];
  reportingFrequency!: RestrictivePracticeRegister["reportingFrequency"];
  nextReviewDate!: RestrictivePracticeRegister["nextReviewDate"];
  client!: RestrictivePracticeRegister["client"];
  Client: RestrictivePracticeRegister["Client"];
  company!: RestrictivePracticeRegister["company"];
  Company: RestrictivePracticeRegister["Company"];
}

modelManager.init(
  "RestrictivePracticeRegister",
  RestrictivePracticeRegisterModel,
  {
    startDate: { type: Sequelize.DATE, allowNull: false },
    endDate: { type: Sequelize.DATE },
    startTime: { type: Sequelize.TIME, allowNull: false },
    endTime: { type: Sequelize.TIME },
    typeOfRestrictivePractice: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    administrationType: { type: Sequelize.STRING, allowNull: false },
    behaviourOfConcerns: { type: Sequelize.STRING, allowNull: false },
    isAuthorised: { type: Sequelize.STRING, allowNull: false },
    reportingFrequency: { type: Sequelize.STRING, allowNull: false },
    nextReviewDate: { type: Sequelize.DATE },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "restrictive_practice_register",
  }
);

export default RestrictivePracticeRegisterModel;
