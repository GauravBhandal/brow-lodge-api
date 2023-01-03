import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  IncidentReport,
  CreateIncidentReportProps,
} from "./incidentReport.types";

class IncidentReportModel<
    ModelAttributes = IncidentReport,
    ModelCreationAttributes = CreateIncidentReportProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements IncidentReport
{
  date!: IncidentReport["date"];
  time!: IncidentReport["time"];
  location!: IncidentReport["location"];
  incidentDescription!: IncidentReport["incidentDescription"];
  eventsPriorToIncident!: IncidentReport["eventsPriorToIncident"];
  actionsTakenByStaff!: IncidentReport["actionsTakenByStaff"];
  actionsTakenByOthers!: IncidentReport["actionsTakenByOthers"];
  anyOtherWitness!: IncidentReport["anyOtherWitness"];
  incidentReportedTo: IncidentReport["incidentReportedTo"];
  assessmentAndDebriefing: IncidentReport["assessmentAndDebriefing"];
  findingsAndActionsTaken: IncidentReport["findingsAndActionsTaken"];
  status: IncidentReport["status"];
  closureDate: IncidentReport["closureDate"];
  manager: IncidentReport["manager"];
  client!: IncidentReport["client"];
  Client: IncidentReport["Client"];
  company!: IncidentReport["company"];
  Company: IncidentReport["Company"];
  Attachments: IncidentReport["Attachments"];
  archived: IncidentReport["archived"];
}

modelManager.init(
  "IncidentReport",
  IncidentReportModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    incidentDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    eventsPriorToIncident: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionsTakenByStaff: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionsTakenByOthers: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    anyOtherWitness: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    incidentReportedTo: {
      type: Sequelize.STRING,
    },
    assessmentAndDebriefing: {
      type: Sequelize.STRING,
    },
    findingsAndActionsTaken: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    closureDate: {
      type: Sequelize.DATE,
    },
    archived: {
      type: Sequelize.BOOLEAN,
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
    tableName: "incident_reports",
  }
);

export default IncidentReportModel;
