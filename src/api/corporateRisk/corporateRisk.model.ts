import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { CorporateRisk, CreateCorporateRiskProps } from "./corporateRisk.types";

class CorporateRiskModel<
    ModelAttributes = CorporateRisk,
    ModelCreationAttributes = CreateCorporateRiskProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements CorporateRisk
{
  date!: CorporateRisk["date"];
  nextReviewDate: CorporateRisk["nextReviewDate"];
  levelOfRisk!: CorporateRisk["levelOfRisk"];
  likelihood!: CorporateRisk["likelihood"];
  consequences!: CorporateRisk["consequences"];
  riskDescription!: CorporateRisk["riskDescription"];
  mitigationStrategy!: CorporateRisk["mitigationStrategy"];
  monitoringStrategy!: CorporateRisk["monitoringStrategy"];
  staff!: CorporateRisk["staff"];
  Staff: CorporateRisk["Staff"];
  company!: CorporateRisk["company"];
  Company: CorporateRisk["Company"];
}

modelManager.init(
  "CorporateRisk",
  CorporateRiskModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    levelOfRisk: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nextReviewDate: {
      type: Sequelize.DATE,
    },
    likelihood: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    consequences: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    riskDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mitigationStrategy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    monitoringStrategy: {
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
    tableName: "corporate_risks",
  }
);

export default CorporateRiskModel;
