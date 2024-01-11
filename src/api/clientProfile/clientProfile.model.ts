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
  email: ClientProfile["email"];
  dateOfBirth: ClientProfile["dateOfBirth"];
  gender: ClientProfile["gender"];
  personalContactNumber: ClientProfile["personalContactNumber"];
  address: ClientProfile["address"];
  company!: ClientProfile["company"];
  Company: ClientProfile["Company"];
  attachment: ClientProfile["attachment"];
  archived: ClientProfile["archived"];
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
