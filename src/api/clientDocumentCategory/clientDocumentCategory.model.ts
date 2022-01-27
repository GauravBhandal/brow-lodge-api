import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ClientDocumentCategory,
  CreateClientDocumentCategoryProps,
} from "./clientDocumentCategory.types";

class ClientDocumentCategoryModel<
    ModelAttributes = ClientDocumentCategory,
    ModelCreationAttributes = CreateClientDocumentCategoryProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ClientDocumentCategory
{
  name!: ClientDocumentCategory["name"];
  company!: ClientDocumentCategory["company"];
  Company: ClientDocumentCategory["Company"];
}

modelManager.init(
  "ClientDocumentCategory",
  ClientDocumentCategoryModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "client_document_categories",
  }
);

export default ClientDocumentCategoryModel;