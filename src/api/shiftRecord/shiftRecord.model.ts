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
  date!: ShiftRecord["date"];
  site: ShiftRecord["site"];
  Site: ShiftRecord["Site"];
  staff!: ShiftRecord["staff"];
  Staff: ShiftRecord["Staff"];
  company!: ShiftRecord["company"];
  Company: ShiftRecord["Company"];
}

modelManager.init(
  "ShiftRecord",
  ShiftRecordModel,
  {
    date: {
      type: Sequelize.DATEONLY,
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
    tableName: "shift_records",
  }
);

export default ShiftRecordModel;
