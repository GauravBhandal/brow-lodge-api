import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import userService from "./user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const params = _pick(req.body, ["fullName", "email"]);

    const user = await userService.createUser(params);

    res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const params = _pick(req.body, ["fullName", "email"]);

    const user = await userService.updateUser(userId, params);

    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;

    const user = await userService.deleteUser(userId);

    res.status(200).json(user);
  }

  async getuserById(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    res.status(200).json(user);
  }

  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();

    res.status(200).json(users);
  }
}

export default new UserController();
