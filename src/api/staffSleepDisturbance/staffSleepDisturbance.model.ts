import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  StaffSleepDisturbance,
  CreateStaffSleepDisturbanceProps,
} from "./staffSleepDisturbance.types";

class StaffSleepDisturbanceModel<
    ModelAttributes = StaffSleepDisturbance,
    ModelCreationAttributes = CreateStaffSleepDisturbanceProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffSleepDisturbance
{
  date!: StaffSleepDisturbance["date"];
  startTime!: StaffSleepDisturbance["startTime"];
  endTime!: StaffSleepDisturbance["endTime"];
  totalHours!: StaffSleepDisturbance["totalHours"];
  description!: StaffSleepDisturbance["description"];
  actions!: StaffSleepDisturbance["actions"];
  staff!: StaffSleepDisturbance["staff"];
  Staff: StaffSleepDisturbance["Staff"];
  client!: StaffSleepDisturbance["client"];
  Client: StaffSleepDisturbance["Client"];
  company!: StaffSleepDisturbance["company"];
  Company: StaffSleepDisturbance["Company"];
}

modelManager.init(
  "StaffSleepDisturbance",
  StaffSleepDisturbanceModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    totalHours: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actions: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "staff_sleep_disturbances",
  }
);

export default StaffSleepDisturbanceModel;
