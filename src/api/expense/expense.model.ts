import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  Expense,
  CreateExpenseProps,
} from "./expense.types";

class ExpenseModel<
    ModelAttributes = Expense,
    ModelCreationAttributes = CreateExpenseProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Expense
{
  date!: Expense["date"];
  staff!: Expense["staff"];
  Staff: Expense["Staff"];
  client: Expense["client"];
  Client: Expense["Client"];
  totalExpense!: Expense["totalExpense"];
  description!: Expense["description"];
  Attachments!: Expense["Attachments"];
  paidBy!: Expense["paidBy"];
  status!: Expense["status"];
  paymentReimbursed!: Expense["paymentReimbursed"];
  company!: Expense["company"];
  Company: Expense["Company"];
  
}

modelManager.init(
  "Expense",
  ExpenseModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    totalExpense: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paidBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paymentReimbursed: {
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
    tableName: "expense",
  }
);

export default ExpenseModel;
