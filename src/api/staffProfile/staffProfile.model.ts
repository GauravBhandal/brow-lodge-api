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
  preferredName!: StaffProfile["preferredName"];
  email!: StaffProfile["email"];
  user: StaffProfile["user"];
  User: StaffProfile["User"];
  company!: StaffProfile["company"];
  Company: StaffProfile["Company"];
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
    preferredName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "staff_profiles",
  }
);

export default StaffProfileModel;
