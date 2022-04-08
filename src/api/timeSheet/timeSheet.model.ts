import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { TimeSheet, CreateTimeSheetProps } from "./timeSheet.types";

class TimeSheetModel<
    ModelAttributes = TimeSheet,
    ModelCreationAttributes = CreateTimeSheetProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements TimeSheet
{
  startDateTime!: TimeSheet["startDateTime"];
  endDateTime!: TimeSheet["endDateTime"];
  staff!: TimeSheet["staff"];
  Staff: TimeSheet["Staff"];
  shift!: TimeSheet["shift"];
  Shift: TimeSheet["Shift"];
  company!: TimeSheet["company"];
  Company: TimeSheet["Company"];
}

modelManager.init(
  "TimeSheet",
  TimeSheetModel,
  {
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: Sequelize.DATE,
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

export default TimeSheetModel;
