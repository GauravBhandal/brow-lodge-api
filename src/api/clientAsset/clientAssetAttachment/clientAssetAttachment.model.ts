import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ClientAssetAttachment,
  CreateBulkClientAssetAttachmentProps,
} from "./clientAssetAttachment.types";

class ClientAssetAttachmentModel<
    ModelAttributes = ClientAssetAttachment,
    ModelCreationAttributes = CreateBulkClientAssetAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientAssetAttachment
{
  relation!: ClientAssetAttachment["relation"];
  attachment!: ClientAssetAttachment["attachment"];
}

modelManager.init(
  "ClientAssetAttachment",
  ClientAssetAttachmentModel,
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
    tableName: "client_assets_attachments",
  }
);

export default ClientAssetAttachmentModel;
