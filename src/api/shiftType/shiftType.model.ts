import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ShiftType, CreateShiftTypeProps } from "./shiftType.types";

class ShiftTypeModel<
    ModelAttributes = ShiftType,
    ModelCreationAttributes = CreateShiftTypeProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ShiftType
{
  name!: ShiftType["name"];
  company!: ShiftType["company"];
  Company: ShiftType["Company"];
}

modelManager.init(
  "ShiftType",
  ShiftTypeModel,
  {
    name: {
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
    tableName: "shift_types",
  }
);

export default ShiftTypeModel;
