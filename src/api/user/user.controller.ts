import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import userService from "./user.service";

class UserController {
  async loginUser(req: Request, res: Response) {
    const props = _pick(req.body, ["email", "password"]);

    const user = await userService.loginUser(props);

    res.status(200).json(user);
  }

  async registerUser(req: Request, res: Response) {
    const props = _pick(req.body, [
      "companyName",
      "firstName",
      "lastName",
      "email",
      "password",
    ]);

    const user = await userService.registerUser(props);

    res.status(200).json(user);
  }

  async createUser(req: Request, res: Response) {
    const bodyParams = _pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "blocked",
    ]);
    const props = {
      company: req.auth.companyId,
      ...bodyParams,
    };

    const user = await userService.createUser(props);

    res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const bodyParams = _pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "blocked",
    ]);
    const props = {
      userId,
      company: req.auth.companyId,
      ...bodyParams,
    };

    const user = await userService.updateUser(props);

    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    const props = {
      company: req.auth.companyId,
      userId,
    };

    await userService.deleteUser(props);

    res.status(204).json();
  }

  async getuserById(req: Request, res: Response) {
    const { userId } = req.params;
    const props = {
      company: req.auth.companyId,
      userId,
    };

    const user = await userService.getUserById(props);

    res.status(200).json(user);
  }

  async getUsers(req: Request, res: Response) {
    const queryParams = _pick(req.query, ["page", "pageSize", "sort"]) as any;
    const props = {
      company: req.auth.companyId,
      ...queryParams,
    };

    const users = await userService.getUsers(props);

    res.status(200).json(users); // TODO: How is .json working on array of objects?
  }
}

export default new UserController();
