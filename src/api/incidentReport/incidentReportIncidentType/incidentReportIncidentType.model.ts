import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  IncidentReportIncidentType,
  CreateBulkIncidentReportIncidentTypeProps,
} from "./incidentReportIncidentType.types";

class IncidentReportIncidentTypeModel<
    ModelAttributes = IncidentReportIncidentType,
    ModelCreationAttributes = CreateBulkIncidentReportIncidentTypeProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements IncidentReportIncidentType
{
  incident!: IncidentReportIncidentType["incident"];
  type!: IncidentReportIncidentType["type"];
}

modelManager.init(
  "IncidentReportIncidentType",
  IncidentReportIncidentTypeModel,
  {
    incident: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    type: {
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
    tableName: "incident_reports_incident_types",
  }
);

export default IncidentReportIncidentTypeModel;
