import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ShiftRecordService,
  CreateBulkShiftRecordServiceProps,
} from "./shiftRecordService.types";

class ShiftRecordServiceModel<
    ModelAttributes = ShiftRecordService,
    ModelCreationAttributes = CreateBulkShiftRecordServiceProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ShiftRecordService
{
  shift!: ShiftRecordService["shift"];
  service!: ShiftRecordService["service"];
  startTime!: ShiftRecordService["startTime"];
}

modelManager.init(
  "ShiftRecordService",
  ShiftRecordServiceModel,
  {
    shift: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    service: {
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
    tableName: "shift_records_services",
  }
);

export default ShiftRecordServiceModel;
