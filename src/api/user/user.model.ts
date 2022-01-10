import Sequelize from "sequelize";
import { pick as _pick } from "lodash";

import modelManager, {
  CommonSequelizeModel,
} from "../../components/sequelize/manager";
import { User, UserCreateModelProps } from "./user.types";

class UserModel<
    ModelAttributes = User,
    ModelCreationAttributes = UserCreateModelProps
  >
  extends CommonSequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements User
{
  fullName!: User["fullName"];
  email!: User["email"];
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
  },
  {
    paranoid: true,
    tableName: "user",
  }
);

export default UserModel;
