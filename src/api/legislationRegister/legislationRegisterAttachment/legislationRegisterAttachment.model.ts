import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  LegislationRegisterAttachment,
  CreateBulkLegislationRegisterAttachmentProps,
} from "./legislationRegisterAttachment.types";

class LegislationRegisterAttachmentModel<
    ModelAttributes = LegislationRegisterAttachment,
    ModelCreationAttributes = CreateBulkLegislationRegisterAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements LegislationRegisterAttachment
{
  relation!: LegislationRegisterAttachment["relation"];
  attachment!: LegislationRegisterAttachment["attachment"];
}

modelManager.init(
  "LegislationRegisterAttachment",
  LegislationRegisterAttachmentModel,
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
    tableName: "legislation_registers_attachments",
  }
);

export default LegislationRegisterAttachmentModel;
