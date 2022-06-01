import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ClientRiskAttachment,
  CreateBulkClientRiskAttachmentProps,
} from "./clientRiskAttachment.types";

class ClientRiskAttachmentModel<
    ModelAttributes = ClientRiskAttachment,
    ModelCreationAttributes = CreateBulkClientRiskAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientRiskAttachment
{
  relation!: ClientRiskAttachment["relation"];
  attachment!: ClientRiskAttachment["attachment"];
}

modelManager.init(
  "ClientRiskAttachment",
  ClientRiskAttachmentModel,
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
    tableName: "client_risk_attachments",
  }
);

export default ClientRiskAttachmentModel;
