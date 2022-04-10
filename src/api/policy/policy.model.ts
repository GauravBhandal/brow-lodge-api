import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Policy, CreatePolicyProps } from "./policy.types";

class PolicyModel<
    ModelAttributes = Policy,
    ModelCreationAttributes = CreatePolicyProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Policy
{
  nextReviewDate: Policy["nextReviewDate"];
  name!: Policy["name"];
  version!: Policy["version"];
  company!: Policy["company"];
  Company: Policy["Company"];
  Attachments: Policy["Attachments"];
}

modelManager.init(
  "Policy",
  PolicyModel,
  {
    nextReviewDate: {
      type: Sequelize.DATE,
    },
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
    tableName: "policies",
  }
);

export default PolicyModel;
