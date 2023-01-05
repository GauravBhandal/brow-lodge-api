import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { KeyDecision, CreateKeyDecisionProps } from "./keyDecision.types";

class KeyDecisionModel<
    ModelAttributes = KeyDecision,
    ModelCreationAttributes = CreateKeyDecisionProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements KeyDecision
{
  date!: KeyDecision["date"];
  description!: KeyDecision["description"];
  decisionRationale!: KeyDecision["decisionRationale"];
  alternativesConsidered: KeyDecision["alternativesConsidered"];
  costImplications: KeyDecision["costImplications"];
  staff!: KeyDecision["staff"];
  Staff: KeyDecision["Staff"];
  company!: KeyDecision["company"];
  Company: KeyDecision["Company"];
  archived: KeyDecision["archived"];
}

modelManager.init(
  "KeyDecision",
  KeyDecisionModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    decisionRationale: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alternativesConsidered: {
      type: Sequelize.STRING,
    },
    costImplications: {
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
    tableName: "key_decisions",
  }
);

export default KeyDecisionModel;
