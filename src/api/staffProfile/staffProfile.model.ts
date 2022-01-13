import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { StaffProfile, CreateStaffProfileProps } from "./staffProfile.types";

class StaffProfileModel<
    ModelAttributes = StaffProfile,
    ModelCreationAttributes = CreateStaffProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffProfile
{
  firstName!: StaffProfile["firstName"];
  lastName!: StaffProfile["lastName"];
}

modelManager.init(
  "StaffProfile",
  StaffProfileModel,
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "staffProfiles",
  }
);

export default StaffProfileModel;
