import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ConflictOfInterestAttachment,
  CreateBulkConflictOfInterestAttachmentProps,
} from "./conflictOfInterestAttachment.types";

class ConflictOfInterestAttachmentModel<
    ModelAttributes = ConflictOfInterestAttachment,
    ModelCreationAttributes = CreateBulkConflictOfInterestAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ConflictOfInterestAttachment
{
  relation!: ConflictOfInterestAttachment["relation"];
  attachment!: ConflictOfInterestAttachment["attachment"];
}

modelManager.init(
  "ConflictOfInterestAttachment",
  ConflictOfInterestAttachmentModel,
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
    tableName: "conflict_of_interests_attachments",
  }
);

export default ConflictOfInterestAttachmentModel;
