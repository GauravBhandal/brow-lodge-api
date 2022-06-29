import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { RpdhsResource, CreateRpdhsResourceProps } from "./rpdhsResource.types";

class RpdhsResourceModel<
    ModelAttributes = RpdhsResource,
    ModelCreationAttributes = CreateRpdhsResourceProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements RpdhsResource
{
  nextReviewDate: RpdhsResource["nextReviewDate"];
  name!: RpdhsResource["name"];
  version!: RpdhsResource["version"];
  company!: RpdhsResource["company"];
  Company: RpdhsResource["Company"];
  Attachments: RpdhsResource["Attachments"];
}

modelManager.init(
  "RpdhsResource",
  RpdhsResourceModel,
  {
    nextReviewDate: { type: Sequelize.DATE },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    version: {
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
    tableName: "rpdhs_resources",
  }
);

export default RpdhsResourceModel;
