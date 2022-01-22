import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { MeetingLog, CreateMeetingLogProps } from "./meetingLog.types";

class MeetingLogModel<
    ModelAttributes = MeetingLog,
    ModelCreationAttributes = CreateMeetingLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements MeetingLog
{
  date!: MeetingLog["date"];
  startTime!: MeetingLog["startTime"];
  endTime!: MeetingLog["endTime"];
  meetingType!: MeetingLog["meetingType"];
  location!: MeetingLog["location"];
  purpose!: MeetingLog["purpose"];
  attendees!: MeetingLog["attendees"];
  apologies!: MeetingLog["apologies"];
  agenda!: MeetingLog["agenda"];
  discussion!: MeetingLog["discussion"];
  action!: MeetingLog["action"];
  staff!: MeetingLog["staff"];
  Staff: MeetingLog["Staff"];
  client: MeetingLog["client"];
  Client: MeetingLog["Client"];
  company!: MeetingLog["company"];
  Company: MeetingLog["Company"];
}

modelManager.init(
  "MeetingLog",
  MeetingLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    meetingType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    purpose: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    attendees: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apologies: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    agenda: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    discussion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    action: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "meeting_Logs",
  }
);

export default MeetingLogModel;
