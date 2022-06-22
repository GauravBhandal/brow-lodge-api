import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ParticipantMedicationChart,
  CreateParticipantMedicationChartProps,
} from "./participantMedicationChart.types";

class ParticipantMedicationChartModel<
    ModelAttributes = ParticipantMedicationChart,
    ModelCreationAttributes = CreateParticipantMedicationChartProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ParticipantMedicationChart
{
  date!: ParticipantMedicationChart["date"];
  nextReviewDate: ParticipantMedicationChart["nextReviewDate"];
  levelOfSupportRequired!: ParticipantMedicationChart["levelOfSupportRequired"];
  notes!: ParticipantMedicationChart["notes"];
  staff!: ParticipantMedicationChart["staff"];
  Staff: ParticipantMedicationChart["Staff"];
  client!: ParticipantMedicationChart["client"];
  Client: ParticipantMedicationChart["Client"];
  company!: ParticipantMedicationChart["company"];
  Company: ParticipantMedicationChart["Company"];
  Attachments: ParticipantMedicationChart["Attachments"];
}

modelManager.init(
  "ParticipantMedicationChart",
  ParticipantMedicationChartModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    nextReviewDate: {
      type: Sequelize.DATE,
    },
    levelOfSupportRequired: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    notes: {
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
    tableName: "participant_medication_charts",
  }
);

export default ParticipantMedicationChartModel;
