import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  ExpenseReimbursement,
  CreateExpenseReimbursementProps,
} from "./expenseReimbursement.types";

class ExpenseReimbursementModel<
    ModelAttributes = ExpenseReimbursement,
    ModelCreationAttributes = CreateExpenseReimbursementProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ExpenseReimbursement
{
  date!: ExpenseReimbursement["date"];
  totalCost!: ExpenseReimbursement["totalCost"];
  description!: ExpenseReimbursement["description"];
  comments: ExpenseReimbursement["comments"];
  paymentStatus: ExpenseReimbursement["paymentStatus"];
  status!: ExpenseReimbursement["status"];
  staff!: ExpenseReimbursement["staff"];
  Staff: ExpenseReimbursement["Staff"];
  company!: ExpenseReimbursement["company"];
  Company: ExpenseReimbursement["Company"];
  Attachments: ExpenseReimbursement["Attachments"];
}

modelManager.init(
  "ExpenseReimbursement",
  ExpenseReimbursementModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    totalCost: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.STRING,
    },
    paymentStatus: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
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
    paranoid: true,
    tableName: "expense_reimbursements",
  }
);

export default ExpenseReimbursementModel;
