import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ShiftRecord, CreateShiftRecordProps } from "./shiftRecord.types";

class ShiftRecordModel<
    ModelAttributes = ShiftRecord,
    ModelCreationAttributes = CreateShiftRecordProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ShiftRecord
{
  startDateTime!: ShiftRecord["startDateTime"];
  endDateTime!: ShiftRecord["endDateTime"];
  break!: ShiftRecord["break"];
  company!: ShiftRecord["company"];
  Company: ShiftRecord["Company"];
  repeat?: ShiftRecord["repeat"];
  user!: ShiftRecord["user"];
  status?: ShiftRecord["status"];
}

modelManager.init(
  "ShiftRecord",
  ShiftRecordModel,
  {
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    break: {
      type: Sequelize.NUMBER,
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
    tableName: "shift_records",
  }
);

export default ShiftRecordModel;
