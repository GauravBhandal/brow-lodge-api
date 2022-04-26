import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ClientProfile, CreateClientProfileProps } from "./clientProfile.types";

class ClientProfileModel<
    ModelAttributes = ClientProfile,
    ModelCreationAttributes = CreateClientProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientProfile
{
  firstName!: ClientProfile["firstName"];
  lastName!: ClientProfile["lastName"];
  preferredName!: ClientProfile["preferredName"];
  email: ClientProfile["email"];
  gender: ClientProfile["gender"];
  accountingCode: ClientProfile["accountingCode"];
  dateOfBirth: ClientProfile["dateOfBirth"];
  address: ClientProfile["address"];
  emergencyContactName: ClientProfile["emergencyContactName"];
  emergencyContactPhone: ClientProfile["emergencyContactPhone"];
  emergencyContactRelation: ClientProfile["emergencyContactRelation"];
  height: ClientProfile["height"];
  fundingType: ClientProfile["fundingType"];
  ndisNumber: ClientProfile["ndisNumber"];
  medicareNumber: ClientProfile["medicareNumber"];
  privateHealthcareNumber: ClientProfile["privateHealthcareNumber"];
  ambulanceNumber: ClientProfile["ambulanceNumber"];
  serviceStartDate: ClientProfile["serviceStartDate"];
  serviceEndDate: ClientProfile["serviceEndDate"];
  archived: ClientProfile["archived"];
  company!: ClientProfile["company"];
  Company: ClientProfile["Company"];
  attachment: ClientProfile["attachment"];
}

modelManager.init(
  "ClientProfile",
  ClientProfileModel,
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
    },
    accountingCode: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
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
    height: {
      type: Sequelize.NUMBER,
    },
    fundingType: {
      type: Sequelize.STRING,
    },
    ndisNumber: {
      type: Sequelize.STRING,
    },
    medicareNumber: {
      type: Sequelize.STRING,
    },
    privateHealthcareNumber: {
      type: Sequelize.STRING,
    },
    ambulanceNumber: {
      type: Sequelize.STRING,
    },
    serviceStartDate: {
      type: Sequelize.DATE,
    },
    serviceEndDate: {
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
    tableName: "client_profiles",
  }
);

export default ClientProfileModel;
