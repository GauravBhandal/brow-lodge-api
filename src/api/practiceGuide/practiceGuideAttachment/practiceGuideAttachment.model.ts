import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  PracticeGuideAttachment,
  CreateBulkPracticeGuideAttachmentProps,
} from "./practiceGuideAttachment.types";

class PracticeGuideAttachmentModel<
    ModelAttributes = PracticeGuideAttachment,
    ModelCreationAttributes = CreateBulkPracticeGuideAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements PracticeGuideAttachment
{
  relation!: PracticeGuideAttachment["relation"];
  attachment!: PracticeGuideAttachment["attachment"];
}

modelManager.init(
  "PracticeGuideAttachment",
  PracticeGuideAttachmentModel,
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
    tableName: "practice_guides_attachments",
  }
);

export default PracticeGuideAttachmentModel;
