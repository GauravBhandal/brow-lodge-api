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
  dateOfBirth: StaffProfile["dateOfBirth"];
  gender: StaffProfile["gender"];
  accountingCode: StaffProfile["accountingCode"];
  personalContactNumber: StaffProfile["personalContactNumber"];
  workContactNumber: StaffProfile["workContactNumber"];
  address: StaffProfile["address"];
  emergencyContactName: StaffProfile["emergencyContactName"];
  emergencyContactPhone: StaffProfile["emergencyContactPhone"];
  emergencyContactRelation: StaffProfile["emergencyContactRelation"];
  jobTitle: StaffProfile["jobTitle"];
  employmentStartDate: StaffProfile["employmentStartDate"];
  employmentEndDate: StaffProfile["employmentEndDate"];
  employmentType: StaffProfile["employmentType"];
  manager: StaffProfile["manager"];
  archived: StaffProfile["archived"];
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
    preferredName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accountingCode: {
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
    workContactNumber: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    emergencyContactName: {
      type: Sequelize.STRING,
    },
    emergencyContactPhone: {
      type: Sequelize.STRING,
    },
    emergencyContactRelation: {
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
    employmentType: {
      type: Sequelize.STRING,
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
