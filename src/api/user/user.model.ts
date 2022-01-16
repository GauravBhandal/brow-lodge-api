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
  firstName!: User["firstName"];
  lastName!: User["lastName"];
  email!: User["email"];
  password!: User["password"];
  blocked!: boolean;
  company!: Company["id"];
  Company?: Company;
  Roles?: Role[];
}

modelManager.init(
  "User",
  UserModel,
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
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
    blocked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: false, // false -> otherwise it prevents deleting and recreating a user with same email
    tableName: "users",
  }
);

export default UserModel;
