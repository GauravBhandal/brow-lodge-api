import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  LegislationRegister,
  CreateLegislationRegisterProps,
} from "./legislationRegister.types";

class LegislationRegisterModel<
    ModelAttributes = LegislationRegister,
    ModelCreationAttributes = CreateLegislationRegisterProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements LegislationRegister
{
  reviewedOn!: LegislationRegister["reviewedOn"];
  nextReviewDate: LegislationRegister["nextReviewDate"];
  domain!: LegislationRegister["domain"];
  legislativeReference!: LegislationRegister["legislativeReference"];
  documentReference!: LegislationRegister["documentReference"];
  monitoringMechanism!: LegislationRegister["monitoringMechanism"];
  company!: LegislationRegister["company"];
  Company: LegislationRegister["Company"];
  Attachments: LegislationRegister["Attachments"];
}

modelManager.init(
  "LegislationRegister",
  LegislationRegisterModel,
  {
    reviewedOn: { type: Sequelize.DATE, allowNull: false },
    nextReviewDate: { type: Sequelize.DATE },
    domain: { type: Sequelize.STRING, allowNull: false },
    legislativeReference: { type: Sequelize.STRING, allowNull: false },
    documentReference: { type: Sequelize.STRING, allowNull: false },
    monitoringMechanism: { type: Sequelize.STRING, allowNull: false },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "legislation_registers",
  }
);

export default LegislationRegisterModel;
