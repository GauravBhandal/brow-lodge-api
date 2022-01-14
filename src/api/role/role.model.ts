import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { Role, CreateRoleProps } from "./role.types";
import { Company } from "../company";

class RoleModel<
    ModelAttributes = Role,
    ModelCreationAttributes = CreateRoleProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements Role
{
  name!: Role["name"];
  description!: Role["description"];
  permissions!: Role["permissions"];
  company!: Company["id"];
  Company?: Company;
}

modelManager.init(
  "Role",
  RoleModel,
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    permissions: {
      type: Sequelize.JSONB,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "roles",
  }
);

export default RoleModel;
