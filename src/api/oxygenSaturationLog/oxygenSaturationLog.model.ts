import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  OxygenSaturationLog,
  CreateOxygenSaturationLogProps,
} from "./oxygenSaturationLog.types";

class OxygenSaturationLogModel<
    ModelAttributes = OxygenSaturationLog,
    ModelCreationAttributes = CreateOxygenSaturationLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements OxygenSaturationLog
{
  date!: OxygenSaturationLog["date"];
  time!: OxygenSaturationLog["time"];
  reading!: OxygenSaturationLog["reading"];
  probePlacement!: OxygenSaturationLog["probePlacement"];
  suctioningRequired!: OxygenSaturationLog["suctioningRequired"];
  typeOfSuctioning: OxygenSaturationLog["typeOfSuctioning"];
  suctionAmount: OxygenSaturationLog["suctionAmount"];
  secretionDescription: OxygenSaturationLog["secretionDescription"];
  readingPostSuctioning: OxygenSaturationLog["readingPostSuctioning"];
  staff!: OxygenSaturationLog["staff"];
  Staff: OxygenSaturationLog["Staff"];
  client!: OxygenSaturationLog["client"];
  Client: OxygenSaturationLog["Client"];
  company!: OxygenSaturationLog["company"];
  Company: OxygenSaturationLog["Company"];
  archived: OxygenSaturationLog["archived"];
}

modelManager.init(
  "OxygenSaturationLog",
  OxygenSaturationLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    reading: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    probePlacement: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    suctioningRequired: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    typeOfSuctioning: {
      type: Sequelize.STRING,
    },
    suctionAmount: {
      type: Sequelize.STRING,
    },
    secretionDescription: {
      type: Sequelize.STRING,
    },
    readingPostSuctioning: {
      type: Sequelize.DECIMAL,
    },
    archived: {
      type: Sequelize.BOOLEAN,
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
    tableName: "oxygen_saturation_logs",
  }
);

export default OxygenSaturationLogModel;
