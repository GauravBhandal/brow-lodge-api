import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ParticipantExpense, CreateParticipantExpenseProps } from "./participantExpense.types";

class ParticipantExpenseModel<
    ModelAttributes = ParticipantExpense,
    ModelCreationAttributes = CreateParticipantExpenseProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ParticipantExpense
{
  date!: ParticipantExpense["date"];
  totalExpense!: ParticipantExpense["totalExpense"];
  description: ParticipantExpense["description"];
  staff!: ParticipantExpense["staff"];
  Staff: ParticipantExpense["Staff"];
  client!: ParticipantExpense["client"];
  Client: ParticipantExpense["Client"];
  company!: ParticipantExpense["company"];
  Company: ParticipantExpense["Company"];
  Attachments: ParticipantExpense["Attachments"];
}

modelManager.init(
  "ParticipantExpense",
  ParticipantExpenseModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    totalExpense: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "participant_expenses",
  }
);

export default ParticipantExpenseModel;
