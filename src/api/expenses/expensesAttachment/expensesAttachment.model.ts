import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  ExpensesAttachment,
  CreateBulkExpensesAttachmentProps,
} from "./expensesAttachment.types";

class ExpensesAttachmentModel<
    ModelAttributes = ExpensesAttachment,
    ModelCreationAttributes = CreateBulkExpensesAttachmentProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ExpensesAttachment
{
  relation!: ExpensesAttachment["relation"];
  attachment!: ExpensesAttachment["attachment"];
}

modelManager.init(
  "ExpensesAttachment",
  ExpensesAttachmentModel,
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
    tableName: "expenses_attachments",
  }
);

export default ExpensesAttachmentModel;
