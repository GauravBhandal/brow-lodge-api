import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  MaintenanceLogAttachment,
  CreateBulkMaintenanceLogAttachmentProps,
} from "./maintenanceLogAttachment.types";

class MaintenanceLogAttachmentModel<
    ModelAttributes = MaintenanceLogAttachment,
    ModelCreationAttributes = CreateBulkMaintenanceLogAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements MaintenanceLogAttachment
{
  relation!: MaintenanceLogAttachment["relation"];
  attachment!: MaintenanceLogAttachment["attachment"];
}

modelManager.init(
  "MaintenanceLogAttachment",
  MaintenanceLogAttachmentModel,
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
    tableName: "maintenance_logs_attachments",
  }
);

export default MaintenanceLogAttachmentModel;
