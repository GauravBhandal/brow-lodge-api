import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  FeedbackAttachment,
  CreateBulkFeedbackAttachmentProps,
} from "./feedbackAttachment.types";

class FeedbackAttachmentModel<
    ModelAttributes = FeedbackAttachment,
    ModelCreationAttributes = CreateBulkFeedbackAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements FeedbackAttachment
{
  relation!: FeedbackAttachment["relation"];
  attachment!: FeedbackAttachment["attachment"];
}

modelManager.init(
  "FeedbackAttachment",
  FeedbackAttachmentModel,
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
    tableName: "feedbacks_attachments",
  }
);

export default FeedbackAttachmentModel;
