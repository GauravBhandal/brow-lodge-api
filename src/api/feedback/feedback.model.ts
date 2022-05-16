import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Feedback, CreateFeedbackProps } from "./feedback.types";

class FeedbackModel<
    ModelAttributes = Feedback,
    ModelCreationAttributes = CreateFeedbackProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Feedback
{
  dateReported!: Feedback["dateReported"];
  name: Feedback["name"];
  email: Feedback["email"];
  phone: Feedback["phone"];
  youAreA!: Feedback["youAreA"];
  typeOfFeedback!: Feedback["typeOfFeedback"];
  feedback!: Feedback["feedback"];
  assessments: Feedback["assessments"];
  actions: Feedback["actions"];
  notifiedOfResult: Feedback["notifiedOfResult"];
  dateClosed: Feedback["dateClosed"];
  status: Feedback["status"];
  staff: Feedback["staff"];
  Staff: Feedback["Staff"];
  company!: Feedback["company"];
  Company: Feedback["Company"];
  Attachments: Feedback["Attachments"];
}

modelManager.init(
  "Feedback",
  FeedbackModel,
  {
    dateReported: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    youAreA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    typeOfFeedback: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    feedback: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    assessments: {
      type: Sequelize.STRING,
    },
    actions: {
      type: Sequelize.STRING,
    },
    notifiedOfResult: {
      type: Sequelize.STRING,
    },
    dateClosed: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.STRING,
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
    tableName: "feedbacks",
  }
);

export default FeedbackModel;
