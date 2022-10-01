import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ProgressReportAttachment,
  CreateBulkProgressReportAttachmentProps,
} from "./progressReportAttachment.types";

class ProgressReportAttachmentModel<
    ModelAttributes = ProgressReportAttachment,
    ModelCreationAttributes = CreateBulkProgressReportAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ProgressReportAttachment
{
  relation!: ProgressReportAttachment["relation"];
  attachment!: ProgressReportAttachment["attachment"];
}

modelManager.init(
  "ProgressReportAttachment",
  ProgressReportAttachmentModel,
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
    tableName: "progress_reports_attachments",
  }
);

export default ProgressReportAttachmentModel;
