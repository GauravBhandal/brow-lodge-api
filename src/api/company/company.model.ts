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
}

modelManager.init(
  "Company",
  CompanyModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "companies",
  }
);

export default CompanyModel;
