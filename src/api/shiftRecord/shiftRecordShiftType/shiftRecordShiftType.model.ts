import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ShiftRecordShiftType,
  CreateBulkShiftRecordShiftTypeProps,
} from "./shiftRecordShiftType.types";

class ShiftRecordShiftTypeModel<
    ModelAttributes = ShiftRecordShiftType,
    ModelCreationAttributes = CreateBulkShiftRecordShiftTypeProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ShiftRecordShiftType
{
  shift!: ShiftRecordShiftType["shift"];
  type!: ShiftRecordShiftType["type"];
  startTime!: ShiftRecordShiftType["startTime"];
}

modelManager.init(
  "ShiftRecordShiftType",
  ShiftRecordShiftTypeModel,
  {
    shift: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    type: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.TIME,
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
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "shift_records_shift_types",
  }
);

export default ShiftRecordShiftTypeModel;
