import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../../components/sequelize/manager";
import { UserRole, CreateUserRoleProps } from "./userRole.types";

class UserRoleModel<
    ModelAttributes = UserRole,
    ModelCreationAttributes = CreateUserRoleProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements UserRole
{
  user!: UserRole["user"];
  role!: UserRole["role"];
}

modelManager.init(
  "UserRole",
  UserRoleModel,
  {
    user: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
    role: {
      type: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "users_roles",
  }
);

export default UserRoleModel;
