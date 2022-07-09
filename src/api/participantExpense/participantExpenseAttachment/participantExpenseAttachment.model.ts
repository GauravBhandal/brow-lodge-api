import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ParticipantExpenseAttachment,
  CreateBulkParticipantExpenseAttachmentProps,
} from "./participantExpenseAttachment.types";

class ParticipantExpenseAttachmentModel<
    ModelAttributes = ParticipantExpenseAttachment,
    ModelCreationAttributes = CreateBulkParticipantExpenseAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ParticipantExpenseAttachment
{
  relation!: ParticipantExpenseAttachment["relation"];
  attachment!: ParticipantExpenseAttachment["attachment"];
}

modelManager.init(
  "ParticipantExpenseAttachment",
  ParticipantExpenseAttachmentModel,
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
    tableName: "participant_expenses_attachments",
  }
);

export default ParticipantExpenseAttachmentModel;
