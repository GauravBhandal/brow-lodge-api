import { Response, Request } from "express";
import { pick as _pick } from "lodash";

import roleService from "./role.service";

class RoleController {
  async createRole(req: Request, res: Response) {
    // TODO: We are not sending company in the request here
    const params = _pick(req.body, [
      "name",
      "description",
      "permissions",
      "company",
    ]);

    const role = await roleService.createRole(params);

    res.status(200).json(role);
  }

  async updateRole(req: Request, res: Response) {
    const { roleId } = req.params;
    const params = _pick(req.body, ["name", "description", "permissions"]);

    const role = await roleService.updateRole(roleId, params);

    res.status(200).json(role);
  }

  async deleteRole(req: Request, res: Response) {
    const { roleId } = req.params;

    const role = await roleService.deleteRole(roleId);

    res.status(200).json(role);
  }

  async getroleById(req: Request, res: Response) {
    const { roleId } = req.params;

    const role = await roleService.getRoleById(roleId);

    res.status(200).json(role);
  }

  async getRoles(req: Request, res: Response) {
    const queryParams = _pick(req.query, ["page", "pageSize", "sort"]) as any;

    const roles = await roleService.getRoles(queryParams);

    res.status(200).json(roles);
  }
}

export default new RoleController();
