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
  },
  {
    paranoid: true,
    tableName: "clientProfiles",
  }
);

export default ClientProfileModel;
