import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ShiftRecordClientProfile,
  CreateBulkShiftRecordClientProfileProps,
} from "./shiftRecordClientProfile.types";

class ShiftRecordClientProfileModel<
    ModelAttributes = ShiftRecordClientProfile,
    ModelCreationAttributes = CreateBulkShiftRecordClientProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ShiftRecordClientProfile
{
  shift!: ShiftRecordClientProfile["shift"];
  client!: ShiftRecordClientProfile["client"];
}

modelManager.init(
  "ShiftRecordClientProfile",
  ShiftRecordClientProfileModel,
  {
    shift: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    client: {
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
    tableName: "shift_records_client_profiles",
  }
);

export default ShiftRecordClientProfileModel;
