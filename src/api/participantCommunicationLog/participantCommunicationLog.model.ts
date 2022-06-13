import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ParticipantCommunicationLog,
  CreateParticipantCommunicationLogProps,
} from "./participantCommunicationLog.types";

class ParticipantCommunicationLogModel<
    ModelAttributes = ParticipantCommunicationLog,
    ModelCreationAttributes = CreateParticipantCommunicationLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ParticipantCommunicationLog
{
  time!: ParticipantCommunicationLog["time"];
  communicationWith: ParticipantCommunicationLog["communicationWith"];
  subject!: ParticipantCommunicationLog["subject"];
  description!: ParticipantCommunicationLog["description"];
  date!: ParticipantCommunicationLog["date"];
  staff!: ParticipantCommunicationLog["staff"];
  Staff: ParticipantCommunicationLog["Staff"];
  client!: ParticipantCommunicationLog["client"];
  Client: ParticipantCommunicationLog["Client"];
  company!: ParticipantCommunicationLog["company"];
  Company: ParticipantCommunicationLog["Company"];
  Attachments: ParticipantCommunicationLog["Attachments"];
}

modelManager.init(
  "ParticipantCommunicationLog",
  ParticipantCommunicationLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    communicationWith: { type: Sequelize.STRING },
    subject: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "participant_communication_logs",
  }
);

export default ParticipantCommunicationLogModel;
