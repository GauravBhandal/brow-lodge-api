import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ProgressNoteAttachment,
  CreateBulkProgressNoteAttachmentProps,
} from "./progressNoteAttachment.types";

class ProgressNoteAttachmentModel<
    ModelAttributes = ProgressNoteAttachment,
    ModelCreationAttributes = CreateBulkProgressNoteAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressNoteAttachment
{
  relation!: ProgressNoteAttachment["relation"];
  attachment!: ProgressNoteAttachment["attachment"];
}

modelManager.init(
  "ProgressNoteAttachment",
  ProgressNoteAttachmentModel,
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
    tableName: "progress_notes_attachments",
  }
);

export default ProgressNoteAttachmentModel;
