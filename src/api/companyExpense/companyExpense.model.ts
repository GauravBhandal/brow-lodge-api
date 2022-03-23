import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import {
  CompanyExpense,
  CreateCompanyExpenseProps,
} from "./companyExpense.types";

class CompanyExpenseModel<
    ModelAttributes = CompanyExpense,
    ModelCreationAttributes = CreateCompanyExpenseProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements CompanyExpense
{
  date!: CompanyExpense["date"];
  totalCost!: CompanyExpense["totalCost"];
  description: CompanyExpense["description"];
  staff!: CompanyExpense["staff"];
  Staff: CompanyExpense["Staff"];
  company!: CompanyExpense["company"];
  Company: CompanyExpense["Company"];
  Attachments: CompanyExpense["Attachments"];
}

modelManager.init(
  "CompanyExpense",
  CompanyExpenseModel,
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["deleted"],
      },
    },
    underscored: true,
    paranoid: true,
    tableName: "company_expenses",
  }
);

export default CompanyExpenseModel;
