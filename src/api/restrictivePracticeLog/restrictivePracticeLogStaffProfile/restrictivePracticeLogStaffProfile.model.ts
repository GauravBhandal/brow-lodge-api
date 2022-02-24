import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  RestrictivePracticeLogStaffProfile,
  CreateBulkRestrictivePracticeLogStaffProfileProps,
} from "./restrictivePracticeLogStaffProfile.types";

class RestrictivePracticeLogStaffProfileModel<
    ModelAttributes = RestrictivePracticeLogStaffProfile,
    ModelCreationAttributes = CreateBulkRestrictivePracticeLogStaffProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RestrictivePracticeLogStaffProfile
{
  relation!: RestrictivePracticeLogStaffProfile["relation"];
  staff!: RestrictivePracticeLogStaffProfile["staff"];
}

modelManager.init(
  "RestrictivePracticeLogStaffProfile",
  RestrictivePracticeLogStaffProfileModel,
  {
    relation: {
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
    tableName: "restrictive_practice_logs_staff_profiles",
  }
);

export default RestrictivePracticeLogStaffProfileModel;
