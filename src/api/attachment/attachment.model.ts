import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Attachment, CreateAttachmentProps } from "./attachment.types";

class AttachmentModel<
    ModelAttributes = Attachment,
    ModelCreationAttributes = CreateAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Attachment
{
  name!: Attachment["name"];
  meme!: Attachment["meme"];
  url!: Attachment["url"];
  company!: Attachment["company"];
  Company: Attachment["Company"];
}

modelManager.init(
  "Attachment",
  AttachmentModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    meme: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
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
    paranoid: true,
    tableName: "attachments",
  }
);

export default AttachmentModel;
