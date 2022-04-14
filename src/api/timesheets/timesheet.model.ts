import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Timesheet, CreateTimesheetProps } from "./timesheet.types";

class TimesheetModel<
    ModelAttributes = Timesheet,
    ModelCreationAttributes = CreateTimesheetProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Timesheet
{
  startDateTime!: Timesheet["startDateTime"];
  endDateTime!: Timesheet["endDateTime"];
  status!: Timesheet["status"];
  staff!: Timesheet["staff"];
  Staff: Timesheet["Staff"];
  shift!: Timesheet["shift"];
  Shift: Timesheet["Shift"];
  company!: Timesheet["company"];
  Company: Timesheet["Company"];
}

modelManager.init(
  "Timesheet",
  TimesheetModel,
  {
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
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
    tableName: "timesheets",
  }
);

export default TimesheetModel;
