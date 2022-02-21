import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  IncidentReportStaffProfile,
  CreateBulkIncidentReportStaffProfileProps,
} from "./incidentReportStaffProfile.types";

class IncidentReportStaffProfileModel<
    ModelAttributes = IncidentReportStaffProfile,
    ModelCreationAttributes = CreateBulkIncidentReportStaffProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements IncidentReportStaffProfile
{
  incident!: IncidentReportStaffProfile["incident"];
  staff!: IncidentReportStaffProfile["staff"];
}

modelManager.init(
  "IncidentReportStaffProfile",
  IncidentReportStaffProfileModel,
  {
    incident: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    staff: {
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
    tableName: "incident_reports_staff_profiles",
  }
);

export default IncidentReportStaffProfileModel;
