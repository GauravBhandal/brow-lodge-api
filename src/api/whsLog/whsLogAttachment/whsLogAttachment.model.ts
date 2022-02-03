import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  WhsLogAttachment,
  CreateBulkWhsLogAttachmentProps,
} from "./whsLogAttachment.types";

class WhsLogAttachmentModel<
    ModelAttributes = WhsLogAttachment,
    ModelCreationAttributes = CreateBulkWhsLogAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements WhsLogAttachment
{
  relation!: WhsLogAttachment["relation"];
  attachment!: WhsLogAttachment["attachment"];
}

modelManager.init(
  "WhsLogAttachment",
  WhsLogAttachmentModel,
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
    tableName: "whs_logs_attachments",
  }
);

export default WhsLogAttachmentModel;
