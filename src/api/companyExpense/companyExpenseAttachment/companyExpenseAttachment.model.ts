import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  CompanyExpenseAttachment,
  CreateBulkCompanyExpenseAttachmentProps,
} from "./companyExpenseAttachment.types";

class CompanyExpenseAttachmentModel<
    ModelAttributes = CompanyExpenseAttachment,
    ModelCreationAttributes = CreateBulkCompanyExpenseAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements CompanyExpenseAttachment
{
  relation!: CompanyExpenseAttachment["relation"];
  attachment!: CompanyExpenseAttachment["attachment"];
}

modelManager.init(
  "CompanyExpenseAttachment",
  CompanyExpenseAttachmentModel,
  {
    relation: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    attachment: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: false, // <-- We are setting to false because of the update functionality of this Model
    tableName: "company_expenses_attachments",
  }
);

export default CompanyExpenseAttachmentModel;
