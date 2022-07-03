import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ProcessAttachment,
  CreateBulkProcessAttachmentProps,
} from "./processAttachment.types";

class ProcessAttachmentModel<
    ModelAttributes = ProcessAttachment,
    ModelCreationAttributes = CreateBulkProcessAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProcessAttachment
{
  relation!: ProcessAttachment["relation"];
  attachment!: ProcessAttachment["attachment"];
}

modelManager.init(
  "ProcessAttachment",
  ProcessAttachmentModel,
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
    tableName: "processes_attachments",
  }
);

export default ProcessAttachmentModel;
