import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ParticipantCommunicationLogAttachment,
  CreateBulkParticipantCommunicationLogAttachmentProps,
} from "./participantCommunicationLogAttachment.types";

class ParticipantCommunicationLogAttachmentModel<
    ModelAttributes = ParticipantCommunicationLogAttachment,
    ModelCreationAttributes = CreateBulkParticipantCommunicationLogAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ParticipantCommunicationLogAttachment
{
  relation!: ParticipantCommunicationLogAttachment["relation"];
  attachment!: ParticipantCommunicationLogAttachment["attachment"];
}

modelManager.init(
  "ParticipantCommunicationLogAttachment",
  ParticipantCommunicationLogAttachmentModel,
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
    tableName: "participant_communication_logs_attachments",
  }
);

export default ParticipantCommunicationLogAttachmentModel;
