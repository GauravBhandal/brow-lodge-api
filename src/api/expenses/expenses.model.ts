import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  Expenses,
  CreateExpensesProps,
} from "./expenses.types";

class ExpensesModel<
    ModelAttributes = Expenses,
    ModelCreationAttributes = CreateExpensesProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Expenses
{
  date!: Expenses["date"];
  staff!: Expenses["staff"];
  Staff: Expenses["Staff"];
  client: Expenses["client"];
  Client: Expenses["Client"];
  totalExpense!: Expenses["totalExpense"];
  description!: Expenses["description"];
  Attachments!: Expenses["Attachments"];
  paidBy!: Expenses["paidBy"];
  status!: Expenses["status"];
  paymentReimbursed!: Expenses["paymentReimbursed"];
  company!: Expenses["company"];
  Company: Expenses["Company"];
  
}

modelManager.init(
  "Expenses",
  ExpensesModel,
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
    tableName: "expenses",
  }
);

export default ExpensesModel;
