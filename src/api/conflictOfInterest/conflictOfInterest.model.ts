import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ConflictOfInterest,
  CreateConflictOfInterestProps,
} from "./conflictOfInterest.types";

class ConflictOfInterestModel<
    ModelAttributes = ConflictOfInterest,
    ModelCreationAttributes = CreateConflictOfInterestProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ConflictOfInterest
{
  date!: ConflictOfInterest["date"];
  conflictDescription!: ConflictOfInterest["conflictDescription"];
  mitigationStrategy!: ConflictOfInterest["mitigationStrategy"];
  staff!: ConflictOfInterest["staff"];
  Staff: ConflictOfInterest["Staff"];
  company!: ConflictOfInterest["company"];
  Company: ConflictOfInterest["Company"];
}

modelManager.init(
  "ConflictOfInterest",
  ConflictOfInterestModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    conflictDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mitigationStrategy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "conflict_of_interests",
  }
);

export default ConflictOfInterestModel;
