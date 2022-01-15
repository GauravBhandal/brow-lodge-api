import UserRoleModel from "./userRole.model";
import { CreateUserRoleProps } from "./userRole.types";

class UserRoleService {
  async createBulkUserRole(props: CreateUserRoleProps) {
    const createProps = props.roles.map((role) => ({
      user: props.user,
      role,
    }));
    const userRole = await UserRoleModel.bulkCreate(createProps);
    return userRole;
  }
}

export default new UserRoleService();
