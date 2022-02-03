import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  InjuryReportAttachment,
  CreateBulkInjuryReportAttachmentProps,
} from "./injuryReportAttachment.types";

class InjuryReportAttachmentModel<
    ModelAttributes = InjuryReportAttachment,
    ModelCreationAttributes = CreateBulkInjuryReportAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements InjuryReportAttachment
{
  relation!: InjuryReportAttachment["relation"];
  attachment!: InjuryReportAttachment["attachment"];
}

modelManager.init(
  "InjuryReportAttachment",
  InjuryReportAttachmentModel,
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
    tableName: "injury_reports_attachments",
  }
);

export default InjuryReportAttachmentModel;
