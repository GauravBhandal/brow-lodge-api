import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ShiftRecordStaffProfile,
  CreateBulkShiftRecordStaffProfileProps,
} from "./shiftRecordStaffProfile.types";

class ShiftRecordStaffProfileModel<
    ModelAttributes = ShiftRecordStaffProfile,
    ModelCreationAttributes = CreateBulkShiftRecordStaffProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ShiftRecordStaffProfile
{
  shift!: ShiftRecordStaffProfile["shift"];
  staff!: ShiftRecordStaffProfile["staff"];
}

modelManager.init(
  "ShiftRecordStaffProfile",
  ShiftRecordStaffProfileModel,
  {
    shift: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    staff: {
      type: Sequelize.UUIDV4,
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
    tableName: "shift_records_staff_profiles",
  }
);

export default ShiftRecordStaffProfileModel;
