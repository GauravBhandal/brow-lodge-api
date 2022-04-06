import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { PolicyReview, CreatePolicyReviewProps } from "./policyReview.types";

class PolicyReviewModel<
    ModelAttributes = PolicyReview,
    ModelCreationAttributes = CreatePolicyReviewProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PolicyReview
{
  reasonForUpdate!: PolicyReview["reasonForUpdate"];
  consultationWith!: PolicyReview["consultationWith"];
  staffEducationCompleted!: PolicyReview["staffEducationCompleted"];
  version!: PolicyReview["version"];
  date!: PolicyReview["date"];
  staff!: PolicyReview["staff"];
  Staff: PolicyReview["Staff"];
  policy!: PolicyReview["policy"];
  Policy: PolicyReview["Policy"];
  company!: PolicyReview["company"];
  Company: PolicyReview["Company"];
  Attachments!: PolicyReview["Attachments"];
}

modelManager.init(
  "PolicyReview",
  PolicyReviewModel,
  {
    reasonForUpdate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    consultationWith: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    staffEducationCompleted: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    version: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
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
    tableName: "policy_reviews",
  }
);

export default PolicyReviewModel;
