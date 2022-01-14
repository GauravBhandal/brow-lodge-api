import RoleModel from "./role.model";
import { Role, CreateRoleProps, UpdateRoleProps } from "./role.types";
import { CustomError } from "../../components/errors";
import RoleErrorCode from "./role.error";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { QueryParams } from "../../common/types";
import { UserModel } from "../user";

class RoleService {
  async createRole(props: CreateRoleProps) {
    // Check if role already exist
    const existingRole = await RoleModel.findOne({
      where: { name: props.name },
    });

    // if the role exists, throw an error
    if (existingRole) {
      throw new CustomError(409, RoleErrorCode.ROLE_ALREADY_EXISTS);
    }

    const role = await RoleModel.create(props);
    return role;
  }

  async updateRole(roleId: Role["id"], props: UpdateRoleProps) {
    const role = await RoleModel.findOne({ where: { id: roleId } });
    if (!role) {
      throw new CustomError(404, RoleErrorCode.ROLE_NOT_FOUND);
    }
    const [, [updatedRole]] = await RoleModel.update(props, {
      where: { id: roleId },
      returning: true,
    });
    return updatedRole;
  }

  async deleteRole(roleId: Role["id"]) {
    const role = await RoleModel.destroy({ where: { id: roleId } });
    return role;
  }

  async getRoles(queryParams: QueryParams) {
    const { page, pageSize, sort } = queryParams;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);

    const data = await RoleModel.findAndCountAll({
      offset,
      limit,
      order,
      include: [
        {
          model: UserModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    const response = getPagingData(data, page, limit);

    return response;
  }

  async getRoleById(roleId: Role["id"]) {
    const role = await RoleModel.findOne({
      where: { id: roleId },
    });
    return role;
  }
}

export default new RoleService();
