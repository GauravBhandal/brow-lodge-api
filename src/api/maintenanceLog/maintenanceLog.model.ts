import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  MaintenanceLog,
  CreateMaintenanceLogProps,
} from "./maintenanceLog.types";

class MaintenanceLogModel<
    ModelAttributes = MaintenanceLog,
    ModelCreationAttributes = CreateMaintenanceLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements MaintenanceLog
{
  date!: MaintenanceLog["date"];
  time!: MaintenanceLog["time"];
  subject!: MaintenanceLog["subject"];
  description!: MaintenanceLog["description"];
  location: MaintenanceLog["location"];
  staff!: MaintenanceLog["staff"];
  Staff: MaintenanceLog["Staff"];
  company!: MaintenanceLog["company"];
  Company: MaintenanceLog["Company"];
  Attachments: MaintenanceLog["Attachments"];
  archived: MaintenanceLog["archived"];
}

modelManager.init(
  "MaintenanceLog",
  MaintenanceLogModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
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
    tableName: "maintenance_logs",
  }
);

export default MaintenanceLogModel;
