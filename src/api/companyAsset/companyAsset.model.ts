import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { CompanyAsset, CreateCompanyAssetProps } from "./companyAsset.types";

class CompanyAssetModel<
    ModelAttributes = CompanyAsset,
    ModelCreationAttributes = CreateCompanyAssetProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements CompanyAsset
{
  date!: CompanyAsset["date"];
  assetName!: CompanyAsset["assetName"];
  location!: CompanyAsset["location"];
  description: CompanyAsset["description"];
  staff!: CompanyAsset["staff"];
  Staff: CompanyAsset["Staff"];
  client!: CompanyAsset["client"];
  Client: CompanyAsset["Client"];
  company!: CompanyAsset["company"];
  Company: CompanyAsset["Company"];
}

modelManager.init(
  "CompanyAsset",
  CompanyAssetModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    assetName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "company_assets",
  }
);

export default CompanyAssetModel;