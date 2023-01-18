import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Site, CreateSiteProps } from "./site.types";

class SiteModel<
    ModelAttributes = Site,
    ModelCreationAttributes = CreateSiteProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Site
{
  name!: Site["name"];
  location!: Site["location"];
  Client: Site["Client"];
  company!: Site["company"];
  Company: Site["Company"];
}

modelManager.init(
  "Site",
  SiteModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
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
    tableName: "sites",
  }
);

export default SiteModel;
