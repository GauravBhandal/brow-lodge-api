import userService from "./user.service";

class UserController {
  async getUser(req: any, res: any) {
    const users = await userService.getUser();

    res.status(200).json(users);
  }

  async createUser(req: any, res: any) {
    const { params } = req;

    const user = await userService.createUser(params);

    res.status(200).json(user);
  }
}

export default new UserController();
