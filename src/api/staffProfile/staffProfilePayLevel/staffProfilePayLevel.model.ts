import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  StaffProfilePayLevel,
  CreateBulkStaffProfilePayLevelProps,
} from "./staffProfilePayLevel.types";

class StaffProfilePayLevelModel<
    ModelAttributes = StaffProfilePayLevel,
    ModelCreationAttributes = CreateBulkStaffProfilePayLevelProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffProfilePayLevel
{
  relation!: StaffProfilePayLevel["relation"];
  paylevel!: StaffProfilePayLevel["paylevel"];
}

modelManager.init(
  "StaffProfilePayLevel",
  StaffProfilePayLevelModel,
  {
    relation: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    paylevel: {
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
    tableName: "staff_profile_pay_level",
  }
);

export default StaffProfilePayLevelModel;
