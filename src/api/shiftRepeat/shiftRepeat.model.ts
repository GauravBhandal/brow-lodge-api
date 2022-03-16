import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ShiftRepeat, CreateShiftRepeatProps } from "./shiftRepeat.types";

class ShiftRepeatModel<
    ModelAttributes = ShiftRepeat,
    ModelCreationAttributes = CreateShiftRepeatProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ShiftRepeat
{
  meta!: ShiftRepeat["meta"];
  company!: ShiftRepeat["company"];
  Company: ShiftRepeat["Company"];
}

modelManager.init(
  "ShiftRepeat",
  ShiftRepeatModel,
  {
    meta: {
      type: Sequelize.JSONB,
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
    tableName: "shift_repeats",
  }
);

export default ShiftRepeatModel;
