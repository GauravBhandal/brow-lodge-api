import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { ClientAsset, CreateClientAssetProps } from "./clientAsset.types";

class ClientAssetModel<
    ModelAttributes = ClientAsset,
    ModelCreationAttributes = CreateClientAssetProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientAsset
{
  date!: ClientAsset["date"];
  assetName!: ClientAsset["assetName"];
  location!: ClientAsset["location"];
  description: ClientAsset["description"];
  staff!: ClientAsset["staff"];
  Staff: ClientAsset["Staff"];
  client!: ClientAsset["client"];
  Client: ClientAsset["Client"];
  company!: ClientAsset["company"];
  Company: ClientAsset["Company"];
}

modelManager.init(
  "ClientAsset",
  ClientAssetModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    assetName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "client_assets",
  }
);

export default ClientAssetModel;
