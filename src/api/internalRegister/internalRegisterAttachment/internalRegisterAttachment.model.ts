import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  InternalRegisterAttachment,
  CreateBulkInternalRegisterAttachmentProps,
} from "./internalRegisterAttachment.types";

class InternalRegisterAttachmentModel<
    ModelAttributes = InternalRegisterAttachment,
    ModelCreationAttributes = CreateBulkInternalRegisterAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements InternalRegisterAttachment
{
  relation!: InternalRegisterAttachment["relation"];
  attachment!: InternalRegisterAttachment["attachment"];
}

modelManager.init(
  "InternalRegisterAttachment",
  InternalRegisterAttachmentModel,
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
    tableName: "internal_registers_attachments",
  }
);

export default InternalRegisterAttachmentModel;
