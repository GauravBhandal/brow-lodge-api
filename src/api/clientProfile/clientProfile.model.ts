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
  dateOfBirth: ClientProfile["dateOfBirth"];
  address: ClientProfile["address"];
  emergencyContactName: ClientProfile["emergencyContactName"];
  emergencyContactPhone: ClientProfile["emergencyContactPhone"];
  emergencyContactRelation: ClientProfile["emergencyContactRelation"];
  height: ClientProfile["height"];
  company!: ClientProfile["company"];
  Company: ClientProfile["Company"];
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
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "client_profiles",
  }
);

export default ClientProfileModel;
