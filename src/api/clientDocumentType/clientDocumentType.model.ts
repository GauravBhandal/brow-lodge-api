import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ClientDocumentType,
  CreateClientDocumentTypeProps,
} from "./clientDocumentType.types";

class ClientDocumentTypeModel<
    ModelAttributes = ClientDocumentType,
    ModelCreationAttributes = CreateClientDocumentTypeProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientDocumentType
{
  name!: ClientDocumentType["name"];
  company!: ClientDocumentType["company"];
  Company: ClientDocumentType["Company"];
}

modelManager.init(
  "ClientDocumentType",
  ClientDocumentTypeModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "client_document_types",
  }
);

export default ClientDocumentTypeModel;
