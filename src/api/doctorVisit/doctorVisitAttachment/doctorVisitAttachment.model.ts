import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  DoctorVisitAttachment,
  CreateBulkDoctorVisitAttachmentProps,
} from "./doctorVisitAttachment.types";

class DoctorVisitAttachmentModel<
    ModelAttributes = DoctorVisitAttachment,
    ModelCreationAttributes = CreateBulkDoctorVisitAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements DoctorVisitAttachment
{
  relation!: DoctorVisitAttachment["relation"];
  attachment!: DoctorVisitAttachment["attachment"];
}

modelManager.init(
  "DoctorVisitAttachment",
  DoctorVisitAttachmentModel,
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
    tableName: "doctor_visit_attachments",
  }
);

export default DoctorVisitAttachmentModel;
