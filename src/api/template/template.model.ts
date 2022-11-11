import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Template, CreateTemplateProps } from "./template.types";

class TemplateModel<
    ModelAttributes = Template,
    ModelCreationAttributes = CreateTemplateProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Template
{
  notes: Template["notes"];
  name!: Template["name"];
  type: Template["type"];
  category: Template["category"];
  version!: Template["version"];
  company!: Template["company"];
  Company: Template["Company"];
  Attachments: Template["Attachments"];
  archived: Template["archived"];
}

modelManager.init(
  "Template",
  TemplateModel,
  {
    notes: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    version: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    archived: {
      type: Sequelize.BOOLEAN,
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
    tableName: "templates",
  }
);

export default TemplateModel;
