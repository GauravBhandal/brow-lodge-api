import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ClockInClockOut,
  CreateClockInClockOutProps,
} from "./clockInClockOut.types";

class ClockInClockOutModel<
    ModelAttributes = ClockInClockOut,
    ModelCreationAttributes = CreateClockInClockOutProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClockInClockOut
{
  startDateTime!: ClockInClockOut["startDateTime"];
  endDateTime?: ClockInClockOut["endDateTime"];
  checkInLocation!: ClockInClockOut["checkInLocation"];
  checkOutLocation?: ClockInClockOut["checkOutLocation"];
  checkInAttachment: ClockInClockOut["checkInAttachment"];
  checkOutAttachment: ClockInClockOut["checkOutAttachment"];
  company!: ClockInClockOut["company"];
  Company: ClockInClockOut["Company"];
  shiftId!: ClockInClockOut["shiftId"];
  ShiftId: ClockInClockOut["ShiftId"];
}

modelManager.init(
  "ClockInClockOut",
  ClockInClockOutModel,
  {
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: Sequelize.DATE,
    },
    checkInLocation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    checkOutLocation: {
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
    tableName: "clockin_clockouts",
  }
);

export default ClockInClockOutModel;
