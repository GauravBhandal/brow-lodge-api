import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import {
  SiteClientProfile,
  CreateBulkSiteClientProfileProps,
} from "./siteClientProfile.types";

class SiteClientProfileModel<
    ModelAttributes = SiteClientProfile,
    ModelCreationAttributes = CreateBulkSiteClientProfileProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements SiteClientProfile
{
  site!: SiteClientProfile["site"];
  client!: SiteClientProfile["client"];
}

modelManager.init(
  "SiteClientProfile",
  SiteClientProfileModel,
  {
    site: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    client: {
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
    tableName: "sites_client_profiles",
  }
);

export default SiteClientProfileModel;
