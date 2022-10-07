import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Company, CreateCompanyProps } from "./company.types";

class CompanyModel<
    ModelAttributes = Company,
    ModelCreationAttributes = CreateCompanyProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Company
{
  name!: Company["name"];
  phone: Company["phone"];
  address: Company["address"];
  website: Company["website"];
  email: Company["email"];
  ndisRegistrationNumber: Company["ndisRegistrationNumber"];
  timezone: Company["timezone"];
  atttachment: Company["attachment"];
  abn: Company["abn"];
  accountBsb: Company["accountBsb"];
  accountNumber: Company["accountNumber"];
  accountName: Company["accountName"];
}

modelManager.init(
  "Company",
  CompanyModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    website: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    ndisRegistrationNumber: { type: Sequelize.STRING },
    timezone: { type: Sequelize.STRING },
    abn: { type: Sequelize.STRING },
    accountBsb: {
      type: Sequelize.STRING,
    },
    accountNumber: {
      type: Sequelize.STRING,
    },
    accountName: {
      type: Sequelize.STRING,
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
    tableName: "companies",
  }
);

export default CompanyModel;
