import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  RepairRequestAttachment,
  CreateBulkRepairRequestAttachmentProps,
} from "./repairRequestAttachment.types";

class RepairRequestAttachmentModel<
    ModelAttributes = RepairRequestAttachment,
    ModelCreationAttributes = CreateBulkRepairRequestAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RepairRequestAttachment
{
  relation!: RepairRequestAttachment["relation"];
  attachment!: RepairRequestAttachment["attachment"];
}

modelManager.init(
  "RepairRequestAttachment",
  RepairRequestAttachmentModel,
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
    tableName: "repair_requests_attachments",
  }
);

export default RepairRequestAttachmentModel;
