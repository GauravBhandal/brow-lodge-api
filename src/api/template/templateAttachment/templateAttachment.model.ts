import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  TemplateAttachment,
  CreateBulkTemplateAttachmentProps,
} from "./templateAttachment.types";

class TemplateAttachmentModel<
    ModelAttributes = TemplateAttachment,
    ModelCreationAttributes = CreateBulkTemplateAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TemplateAttachment
{
  relation!: TemplateAttachment["relation"];
  attachment!: TemplateAttachment["attachment"];
}

modelManager.init(
  "TemplateAttachment",
  TemplateAttachmentModel,
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
    tableName: "templates_attachments",
  }
);

export default TemplateAttachmentModel;
