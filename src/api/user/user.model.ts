import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { User, CreateUserProps } from "./user.types";
import { Company } from "../company";
import { Role } from "../role";

class UserModel<
    ModelAttributes = User,
    ModelCreationAttributes = CreateUserProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements User
{
  fullName!: User["fullName"];
  email!: User["email"];
  password!: User["password"];
  company!: Company["id"];
  Company?: Company;
  Roles?: Role[];
}

modelManager.init(
  "User",
  UserModel,
  {
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    tableName: "users",
  }
);

export default UserModel;
