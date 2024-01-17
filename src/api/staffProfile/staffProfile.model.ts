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
  email: StaffProfile["email"];
  dateOfBirth: StaffProfile["dateOfBirth"];
  gender: StaffProfile["gender"];
  personalContactNumber: StaffProfile["personalContactNumber"];
  address: StaffProfile["address"];
  jobTitle: StaffProfile["jobTitle"];
  employmentStartDate: StaffProfile["employmentStartDate"];
  employmentEndDate: StaffProfile["employmentEndDate"];
  user: StaffProfile["user"];
  User: StaffProfile["User"];
  company!: StaffProfile["company"];
  Company: StaffProfile["Company"];
  attachment: StaffProfile["attachment"];
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
    email: {
      type: Sequelize.STRING,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
    },
    gender: {
      type: Sequelize.STRING,
    },
    personalContactNumber: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    jobTitle: {
      type: Sequelize.STRING,
    },
    employmentStartDate: {
      type: Sequelize.DATE,
    },
    employmentEndDate: {
      type: Sequelize.DATE,
    },
    archived: {
      type: Sequelize.BOOLEAN,
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
    tableName: "staff_profiles",
  }
);

export default StaffProfileModel;
