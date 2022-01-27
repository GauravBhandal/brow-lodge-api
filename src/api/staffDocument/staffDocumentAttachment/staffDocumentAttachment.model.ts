import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  StaffDocumentAttachment,
  CreateBulkStaffDocumentAttachmentProps,
} from "./staffDocumentAttachment.types";

class StaffDocumentAttachmentModel<
    ModelAttributes = StaffDocumentAttachment,
    ModelCreationAttributes = CreateBulkStaffDocumentAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffDocumentAttachment
{
  relation!: StaffDocumentAttachment["relation"];
  attachment!: StaffDocumentAttachment["attachment"];
}

modelManager.init(
  "StaffDocumentAttachment",
  StaffDocumentAttachmentModel,
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
    underscored: true,
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "staff_documents_attachments",
  }
);

export default StaffDocumentAttachmentModel;
