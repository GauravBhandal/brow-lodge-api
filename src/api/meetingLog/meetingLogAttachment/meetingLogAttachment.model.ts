import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  MeetingLogAttachment,
  CreateBulkMeetingLogAttachmentProps,
} from "./meetingLogAttachment.types";

class MeetingLogAttachmentModel<
    ModelAttributes = MeetingLogAttachment,
    ModelCreationAttributes = CreateBulkMeetingLogAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements MeetingLogAttachment
{
  relation!: MeetingLogAttachment["relation"];
  attachment!: MeetingLogAttachment["attachment"];
}

modelManager.init(
  "MeetingLogAttachment",
  MeetingLogAttachmentModel,
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
    tableName: "meeting_logs_attachments",
  }
);

export default MeetingLogAttachmentModel;
