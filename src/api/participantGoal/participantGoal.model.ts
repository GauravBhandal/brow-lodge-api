import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ParticipantGoal,
  CreateParticipantGoalProps,
} from "./participantGoal.types";

class ParticipantGoalModel<
    ModelAttributes = ParticipantGoal,
    ModelCreationAttributes = CreateParticipantGoalProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ParticipantGoal
{
  client!: ParticipantGoal["client"];
  Client: ParticipantGoal["Client"];
  staff!: ParticipantGoal["staff"];
  Staff: ParticipantGoal["Staff"];
  title!: ParticipantGoal["title"];
  description!: ParticipantGoal["description"];
  strategy!: ParticipantGoal["strategy"];
  support!: ParticipantGoal["support"];
  type!: ParticipantGoal["type"];
  status!: ParticipantGoal["status"];
  comments: ParticipantGoal["comments"];
  startDate!: ParticipantGoal["startDate"];
  reviewDate: ParticipantGoal["reviewDate"];
  dueDate: ParticipantGoal["dueDate"];
  company!: ParticipantGoal["company"];
  Company: ParticipantGoal["Company"];
}

modelManager.init(
  "ParticipantGoal",
  ParticipantGoalModel,
  {
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    strategy: { type: Sequelize.STRING, allowNull: false },
    support: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING, allowNull: false },
    comments: { type: Sequelize.STRING },
    startDate: { type: Sequelize.DATE, allowNull: false },
    reviewDate: { type: Sequelize.DATE },
    dueDate: { type: Sequelize.DATE },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "participant_goal",
  }
);

export default ParticipantGoalModel;
