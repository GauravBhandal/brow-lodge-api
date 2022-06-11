import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ParticipantMedicationChartAttachment,
  CreateBulkParticipantMedicationChartAttachmentProps,
} from "./participantMedicationChartAttachment.types";

class ParticipantMedicationChartAttachmentModel<
    ModelAttributes = ParticipantMedicationChartAttachment,
    ModelCreationAttributes = CreateBulkParticipantMedicationChartAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ParticipantMedicationChartAttachment
{
  relation!: ParticipantMedicationChartAttachment["relation"];
  attachment!: ParticipantMedicationChartAttachment["attachment"];
}

modelManager.init(
  "ParticipantMedicationChartAttachment",
  ParticipantMedicationChartAttachmentModel,
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
    tableName: "participant_medication_charts_attachments",
  }
);

export default ParticipantMedicationChartAttachmentModel;
