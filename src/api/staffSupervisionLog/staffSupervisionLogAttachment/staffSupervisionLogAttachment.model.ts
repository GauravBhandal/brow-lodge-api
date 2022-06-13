import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  StaffSupervisionLogAttachment,
  CreateBulkStaffSupervisionLogAttachmentProps,
} from "./staffSupervisionLogAttachment.types";

class StaffSupervisionLogAttachmentModel<
    ModelAttributes = StaffSupervisionLogAttachment,
    ModelCreationAttributes = CreateBulkStaffSupervisionLogAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffSupervisionLogAttachment
{
  relation!: StaffSupervisionLogAttachment["relation"];
  attachment!: StaffSupervisionLogAttachment["attachment"];
}

modelManager.init(
  "StaffSupervisionLogAttachment",
  StaffSupervisionLogAttachmentModel,
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
    tableName: "staff_supervision_logs_attachments",
  }
);

export default StaffSupervisionLogAttachmentModel;
