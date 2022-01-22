import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { DocumentLog, CreateDocumentLogProps } from "./documentLog.types";

class DocumentLogModel<
    ModelAttributes = DocumentLog,
    ModelCreationAttributes = CreateDocumentLogProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements DocumentLog
{
  name!: DocumentLog["name"];
  url!: DocumentLog["url"];
  company!: DocumentLog["company"];
  Company: DocumentLog["Company"];
}

modelManager.init(
  "DocumentLog",
  DocumentLogModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "document_logs",
  }
);

export default DocumentLogModel;
