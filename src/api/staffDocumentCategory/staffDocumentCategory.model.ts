import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  StaffDocumentCategory,
  CreateStaffDocumentCategoryProps,
} from "./staffDocumentCategory.types";

class StaffDocumentCategoryModel<
    ModelAttributes = StaffDocumentCategory,
    ModelCreationAttributes = CreateStaffDocumentCategoryProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements StaffDocumentCategory
{
  name!: StaffDocumentCategory["name"];
  company!: StaffDocumentCategory["company"];
  Company: StaffDocumentCategory["Company"];
}

modelManager.init(
  "StaffDocumentCategory",
  StaffDocumentCategoryModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "staff_document_categories",
  }
);

export default StaffDocumentCategoryModel;
