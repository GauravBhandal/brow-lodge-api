import UserModel from "./user.model";

class UserService {
  async getUser() {
    const users = await UserModel.findAll();

    return users;
  }

  async createUser(params: any) {
    const user = await UserModel.create(params);

    return user;
  }
}

export default new UserService();
