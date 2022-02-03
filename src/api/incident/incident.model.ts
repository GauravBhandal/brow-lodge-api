import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Incident, CreateIncidentProps } from "./incident.types";

class IncidentModel<
    ModelAttributes = Incident,
    ModelCreationAttributes = CreateIncidentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Incident
{
  date!: Incident["date"];
  time!: Incident["time"];
  location!: Incident["location"];
  incidentDescription!: Incident["incidentDescription"];
  eventsPriorToIncident!: Incident["eventsPriorToIncident"];
  actionsTakenByStaff!: Incident["actionsTakenByStaff"];
  actionsTakenByOthers!: Incident["actionsTakenByOthers"];
  anyOtherWitness!: Incident["anyOtherWitness"];
  incidentReportedTo: Incident["incidentReportedTo"];
  assessmentAndDebriefing: Incident["assessmentAndDebriefing"];
  findingsAndActionsTaken: Incident["findingsAndActionsTaken"];
  status: Incident["status"];
  closureDate: Incident["closureDate"];
  manager: Incident["manager"];
  client!: Incident["client"];
  Client: Incident["Client"];
  company!: Incident["company"];
  Company: Incident["Company"];
  Attachments: Incident["Attachments"];
}

modelManager.init(
  "Incident",
  IncidentModel,
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
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "incidents",
  }
);

export default IncidentModel;
