import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  IncidentReportAttachment,
  CreateBulkIncidentReportAttachmentProps,
} from "./incidentReportAttachment.types";

class IncidentReportAttachmentModel<
    ModelAttributes = IncidentReportAttachment,
    ModelCreationAttributes = CreateBulkIncidentReportAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements IncidentReportAttachment
{
  relation!: IncidentReportAttachment["relation"];
  attachment!: IncidentReportAttachment["attachment"];
}

modelManager.init(
  "IncidentReportAttachment",
  IncidentReportAttachmentModel,
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
    tableName: "incident_reports_attachments",
  }
);

export default IncidentReportAttachmentModel;
