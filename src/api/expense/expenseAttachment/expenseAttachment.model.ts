import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ExpenseAttachment,
  CreateBulkExpenseAttachmentProps,
} from "./expenseAttachment.types";

class ExpenseAttachmentModel<
    ModelAttributes = ExpenseAttachment,
    ModelCreationAttributes = CreateBulkExpenseAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ExpenseAttachment
{
  relation!: ExpenseAttachment["relation"];
  attachment!: ExpenseAttachment["attachment"];
}

modelManager.init(
  "ExpenseAttachment",
  ExpenseAttachmentModel,
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
    tableName: "expense_attachments",
  }
);

export default ExpenseAttachmentModel;
