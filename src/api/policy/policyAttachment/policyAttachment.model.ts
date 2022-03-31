import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  PolicyAttachment,
  CreateBulkPolicyAttachmentProps,
} from "./policyAttachment.types";

class PolicyAttachmentModel<
    ModelAttributes = PolicyAttachment,
    ModelCreationAttributes = CreateBulkPolicyAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PolicyAttachment
{
  relation!: PolicyAttachment["relation"];
  attachment!: PolicyAttachment["attachment"];
}

modelManager.init(
  "PolicyAttachment",
  PolicyAttachmentModel,
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
    tableName: "policies_attachments",
  }
);

export default PolicyAttachmentModel;
