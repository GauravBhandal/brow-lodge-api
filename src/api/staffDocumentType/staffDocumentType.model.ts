import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  StaffDocumentType,
  CreateStaffDocumentTypeProps,
} from "./staffDocumentType.types";

class StaffDocumentTypeModel<
    ModelAttributes = StaffDocumentType,
    ModelCreationAttributes = CreateStaffDocumentTypeProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffDocumentType
{
  name!: StaffDocumentType["name"];
  company!: StaffDocumentType["company"];
  Company: StaffDocumentType["Company"];
  category!: StaffDocumentType["category"];
  Category: StaffDocumentType["Category"];
}

modelManager.init(
  "StaffDocumentType",
  StaffDocumentTypeModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "staff_document_types",
  }
);

export default StaffDocumentTypeModel;
