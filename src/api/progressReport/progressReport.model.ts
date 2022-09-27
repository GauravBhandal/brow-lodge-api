import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ProgressReport,
  CreateProgressReportProps,
} from "./progressReport.types";

class ProgressReportModel<
    ModelAttributes = ProgressReport,
    ModelCreationAttributes = CreateProgressReportProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressReport
{
  startDate!: ProgressReport["startDate"];
  endDate!: ProgressReport["endDate"];
  documentedOn!: ProgressReport["documentedOn"];
  progressNotes!: ProgressReport["progressNotes"];
  behaviourOfConcerns!: ProgressReport["behaviourOfConcerns"];
  diet!: ProgressReport["diet"];
  fluids!: ProgressReport["fluids"];
  activities!: ProgressReport["activities"];
  chokingObservations: ProgressReport["chokingObservations"];
  appointmentsOrFamilyVisits: ProgressReport["appointmentsOrFamilyVisits"];
  staffAdministeredMedication: ProgressReport["staffAdministeredMedication"];
  ndisGoalSetting: ProgressReport["ndisGoalSetting"];
  independentSkills: ProgressReport["independentSkills"];
  communityAccess: ProgressReport["communityAccess"];
  staff!: ProgressReport["staff"];
  Staff: ProgressReport["Staff"];
  client!: ProgressReport["client"];
  Client: ProgressReport["Client"];
  company!: ProgressReport["company"];
  Company: ProgressReport["Company"];
  Attachments: ProgressReport["Attachments"];
}

modelManager.init(
  "ProgressReport",
  ProgressReportModel,
  {
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    documentedOn: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    progressNotes: { type: Sequelize.STRING, allowNull: false },
    behaviourOfConcerns: { type: Sequelize.STRING, allowNull: false },
    diet: { type: Sequelize.STRING, allowNull: false },
    fluids: { type: Sequelize.STRING, allowNull: false },
    activities: { type: Sequelize.STRING, allowNull: false },
    chokingObservations: { type: Sequelize.STRING },
    appointmentsOrFamilyVisits: { type: Sequelize.STRING },
    staffAdministeredMedication: { type: Sequelize.STRING },
    ndisGoalSetting: { type: Sequelize.STRING },
    independentSkills: { type: Sequelize.STRING },
    communityAccess: { type: Sequelize.STRING },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "progress_reports",
  }
);

export default ProgressReportModel;
