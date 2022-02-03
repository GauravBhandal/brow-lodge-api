import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ClientDocument,
  CreateClientDocumentProps,
} from "./clientDocument.types";

class ClientDocumentModel<
    ModelAttributes = ClientDocument,
    ModelCreationAttributes = CreateClientDocumentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientDocument
{
  comments: ClientDocument["comments"];
  hasExpiry!: ClientDocument["hasExpiry"];
  expiryDate: ClientDocument["expiryDate"];
  client!: ClientDocument["client"];
  Client: ClientDocument["Client"];
  category!: ClientDocument["category"];
  Category: ClientDocument["Category"];
  type!: ClientDocument["type"];
  Type: ClientDocument["Type"];
  company!: ClientDocument["company"];
  Company: ClientDocument["Company"];
  Attachments: ClientDocument["Attachments"];
}

modelManager.init(
  "ClientDocument",
  ClientDocumentModel,
  {
    comments: {
      type: Sequelize.STRING,
    },
    hasExpiry: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    expiryDate: {
      type: Sequelize.DATE,
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
    tableName: "client_documents",
  }
);

export default ClientDocumentModel;
