import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ExternalContractAttachment,
  CreateBulkExternalContractAttachmentProps,
} from "./externalContractAttachment.types";

class ExternalContractAttachmentModel<
    ModelAttributes = ExternalContractAttachment,
    ModelCreationAttributes = CreateBulkExternalContractAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ExternalContractAttachment
{
  relation!: ExternalContractAttachment["relation"];
  attachment!: ExternalContractAttachment["attachment"];
}

modelManager.init(
  "ExternalContractAttachment",
  ExternalContractAttachmentModel,
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
    tableName: "external_contracts_attachments",
  }
);

export default ExternalContractAttachmentModel;
