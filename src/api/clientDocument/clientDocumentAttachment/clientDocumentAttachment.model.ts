import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ClientDocumentAttachment,
  CreateBulkClientDocumentAttachmentProps,
} from "./clientDocumentAttachment.types";

class ClientDocumentAttachmentModel<
    ModelAttributes = ClientDocumentAttachment,
    ModelCreationAttributes = CreateBulkClientDocumentAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientDocumentAttachment
{
  relation!: ClientDocumentAttachment["relation"];
  attachment!: ClientDocumentAttachment["attachment"];
}

modelManager.init(
  "ClientDocumentAttachment",
  ClientDocumentAttachmentModel,
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
    underscored: true,
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "client_documents_attachments",
  }
);

export default ClientDocumentAttachmentModel;
