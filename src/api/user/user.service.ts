import UserModel from "./user.model";
import { User, CreateUserProps, UpdateUserProps } from "./user.types";

class UserService {
  async createUser(props: CreateUserProps) {
    const user = await UserModel.create(props);
    return user;
  }

  async updateUser(userId: User["id"], props: UpdateUserProps) {
    const [, [user]] = await UserModel.update(props, {
      where: { id: userId },
      returning: true,
    });
    return user;
  }

  async deleteUser(userId: User["id"]) {
    const user = await UserModel.destroy({ where: { id: userId } });
    return user;
  }

  async getUsers() {
    const users = await UserModel.findAll();
    return users;
  }

  async getUserById(userId: User["id"]) {
    const user = await UserModel.findOne({ where: { id: userId } });
    return user;
  }
}

export default new UserService();
