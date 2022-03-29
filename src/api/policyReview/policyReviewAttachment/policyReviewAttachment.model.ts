import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  PolicyReviewAttachment,
  CreateBulkPolicyReviewAttachmentProps,
} from "./policyReviewAttachment.types";

class PolicyReviewAttachmentModel<
    ModelAttributes = PolicyReviewAttachment,
    ModelCreationAttributes = CreateBulkPolicyReviewAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PolicyReviewAttachment
{
  relation!: PolicyReviewAttachment["relation"];
  attachment!: PolicyReviewAttachment["attachment"];
}

modelManager.init(
  "PolicyReviewAttachment",
  PolicyReviewAttachmentModel,
  {
    relation: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    attachment: {
      type: Sequelize.UUIDV4,
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
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "policy_reviews_attachments",
  }
);

export default PolicyReviewAttachmentModel;
