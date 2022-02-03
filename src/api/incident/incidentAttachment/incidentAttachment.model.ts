import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  IncidentAttachment,
  CreateBulkIncidentAttachmentProps,
} from "./incidentAttachment.types";

class IncidentAttachmentModel<
    ModelAttributes = IncidentAttachment,
    ModelCreationAttributes = CreateBulkIncidentAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements IncidentAttachment
{
  relation!: IncidentAttachment["relation"];
  attachment!: IncidentAttachment["attachment"];
}

modelManager.init(
  "IncidentAttachment",
  IncidentAttachmentModel,
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
    tableName: "incidents_attachments",
  }
);

export default IncidentAttachmentModel;
