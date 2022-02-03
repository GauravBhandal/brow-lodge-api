import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Resource, CreateResourceProps } from "./resource.types";

class ResourceModel<
    ModelAttributes = Resource,
    ModelCreationAttributes = CreateResourceProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Resource
{
  date!: Resource["date"];
  collectionTypes: Resource["collectionTypes"];
  type!: Resource["type"];
  title!: Resource["title"];
  text: Resource["text"];
  link: Resource["link"];
  atttachment: Resource["attachment"];
  staff!: Resource["staff"];
  Staff: Resource["Staff"];
  company!: Resource["company"];
  Company: Resource["Company"];
}

modelManager.init(
  "Resource",
  ResourceModel,
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    collectionTypes: {
      type: Sequelize.JSONB,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
    },
    link: {
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
    tableName: "resources",
  }
);

export default ResourceModel;
