import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  RegulatoryComplianceAttachment,
  CreateBulkRegulatoryComplianceAttachmentProps,
} from "./regulatoryComplianceAttachment.types";

class RegulatoryComplianceAttachmentModel<
    ModelAttributes = RegulatoryComplianceAttachment,
    ModelCreationAttributes = CreateBulkRegulatoryComplianceAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RegulatoryComplianceAttachment
{
  relation!: RegulatoryComplianceAttachment["relation"];
  attachment!: RegulatoryComplianceAttachment["attachment"];
}

modelManager.init(
  "RegulatoryComplianceAttachment",
  RegulatoryComplianceAttachmentModel,
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
    tableName: "regulatory_compliances_attachments",
  }
);

export default RegulatoryComplianceAttachmentModel;
