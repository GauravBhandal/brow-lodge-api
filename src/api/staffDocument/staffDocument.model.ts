import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { StaffDocument, CreateStaffDocumentProps } from "./staffDocument.types";

class StaffDocumentModel<
    ModelAttributes = StaffDocument,
    ModelCreationAttributes = CreateStaffDocumentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffDocument
{
  comments: StaffDocument["comments"];
  hasExpiry!: StaffDocument["hasExpiry"];
  expiryDate: StaffDocument["expiryDate"];
  staff!: StaffDocument["staff"];
  Staff: StaffDocument["Staff"];
  category!: StaffDocument["category"];
  Category: StaffDocument["Category"];
  type!: StaffDocument["type"];
  Type: StaffDocument["Type"];
  company!: StaffDocument["company"];
  Company: StaffDocument["Company"];
  Attachments: StaffDocument["Attachments"];
}

modelManager.init(
  "StaffDocument",
  StaffDocumentModel,
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
    underscored: true,
    paranoid: true,
    tableName: "staff_documents",
  }
);

export default StaffDocumentModel;
