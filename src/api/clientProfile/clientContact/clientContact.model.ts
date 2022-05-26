import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import { ClientContact, CreateClientContactProps } from "./clientContact.types";

class ClientContactModel<
    ModelAttributes = ClientContact,
    ModelCreationAttributes = CreateClientContactProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientContact
{
  name!: ClientContact["name"];
  type!: ClientContact["type"];
  email!: ClientContact["email"];
  address!: ClientContact["address"];
  phone!: ClientContact["phone"];
  client!: ClientContact["client"];
  Client: ClientContact["Client"];
  company!: ClientContact["company"];
  Company: ClientContact["Company"];
}

modelManager.init(
  "ClientContact",
  ClientContactModel,
  {
    name: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "client_contacts",
  }
);

export default ClientContactModel;
