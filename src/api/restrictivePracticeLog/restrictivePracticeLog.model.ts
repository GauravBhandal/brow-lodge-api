import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  RestrictivePracticeLog,
  CreateRestrictivePracticeLogProps,
} from "./restrictivePracticeLog.types";

class RestrictivePracticeLogModel<
    ModelAttributes = RestrictivePracticeLog,
    ModelCreationAttributes = CreateRestrictivePracticeLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RestrictivePracticeLog
{
  isAuthorised!: RestrictivePracticeLog["isAuthorised"];
  type!: RestrictivePracticeLog["type"];
  impactOnAnyPerson!: RestrictivePracticeLog["impactOnAnyPerson"];
  injuryToAnyPerson!: RestrictivePracticeLog["injuryToAnyPerson"];
  wasReportableIncident!: RestrictivePracticeLog["wasReportableIncident"];
  reasonBehindUse!: RestrictivePracticeLog["reasonBehindUse"];
  describeBehaviour!: RestrictivePracticeLog["describeBehaviour"];
  startDate!: RestrictivePracticeLog["startDate"];
  startTime!: RestrictivePracticeLog["startTime"];
  startLocation!: RestrictivePracticeLog["startLocation"];
  endDate!: RestrictivePracticeLog["endDate"];
  endTime!: RestrictivePracticeLog["endTime"];
  endLocation!: RestrictivePracticeLog["endLocation"];
  anyWitness!: RestrictivePracticeLog["anyWitness"];
  actionTakenInResponse!: RestrictivePracticeLog["actionTakenInResponse"];
  alternativesConsidered!: RestrictivePracticeLog["alternativesConsidered"];
  actionTakenLeadingUpTo!: RestrictivePracticeLog["actionTakenLeadingUpTo"];
  staff!: RestrictivePracticeLog["staff"];
  Staff: RestrictivePracticeLog["Staff"];
  client!: RestrictivePracticeLog["client"];
  Client: RestrictivePracticeLog["Client"];
  company!: RestrictivePracticeLog["company"];
  Company: RestrictivePracticeLog["Company"];
}

modelManager.init(
  "RestrictivePracticeLog",
  RestrictivePracticeLogModel,
  {
    isAuthorised: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    impactOnAnyPerson: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    injuryToAnyPerson: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    wasReportableIncident: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    reasonBehindUse: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    describeBehaviour: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    startlocation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    endlocation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    anyWitness: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionTakenInResponse: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alternativesConsidered: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionTakenLeadingUpTo: {
      type: Sequelize.STRING,
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
    paranoid: true,
    tableName: "restrictive_practice_logs",
  }
);

export default RestrictivePracticeLogModel;
