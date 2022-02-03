import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  LeaseAndUtilityLogAttachment,
  CreateBulkLeaseAndUtilityLogAttachmentProps,
} from "./leaseAndUtilityLogAttachment.types";

class LeaseAndUtilityLogAttachmentModel<
    ModelAttributes = LeaseAndUtilityLogAttachment,
    ModelCreationAttributes = CreateBulkLeaseAndUtilityLogAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements LeaseAndUtilityLogAttachment
{
  relation!: LeaseAndUtilityLogAttachment["relation"];
  attachment!: LeaseAndUtilityLogAttachment["attachment"];
}

modelManager.init(
  "LeaseAndUtilityLogAttachment",
  LeaseAndUtilityLogAttachmentModel,
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
    tableName: "lease_and_utility_logs_attachments",
  }
);

export default LeaseAndUtilityLogAttachmentModel;
