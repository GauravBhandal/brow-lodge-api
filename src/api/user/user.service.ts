import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { omit as _omit } from "lodash";

import UserModel from "./user.model";
import {
  MeProps,
  LoginUserProps,
  RegisterUserProps,
  CreateUserProps,
  UpdateUserProps,
  DeleteUserProps,
  GetUserByIdProps,
  GetUsersProps,
} from "./user.types";
import { CustomError } from "../../components/errors";
import UserErrorCode from "./user.error";
import config from "../../config/environment";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { RoleModel, roleService } from "../role";
import { companyService } from "../company";
import { userRoleService } from "./userRole";
import { getFilters } from "../../components/filters";

class UserService {
  async me(props: MeProps) {
    const { id, company } = props;

    const user = await UserModel.findOne({
      where: { id, company },
      include: [
        {
          model: RoleModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // if user don't exists, throw an error
    if (!user) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }

    return user;
  }

  async loginUser(props: LoginUserProps) {
    // Check if user exist with the given email
    const user = await UserModel.findOne({
      where: { email: props.email },
      include: [
        {
          model: RoleModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // if user don't exists, throw an error
    if (!user) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }

    // Check if password matches with one store in database
    const isPasswordCorrect = await bcrypt.compare(
      props.password,
      user.password
    );

    if (isPasswordCorrect) {
      // If password is correct, create a jwtToken
      const token = jwt.sign(
        { userId: user.id, companyId: user.company },
        config.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      // Add the jwtToken to response
      const userWithToken = {
        user,
        jwt: token,
      };
      return userWithToken;
    }

    throw new CustomError(400, UserErrorCode.INVALID_CREDENTIALS);
  }

  async registerUser(props: RegisterUserProps) {
    // Check if user already exist
    const existingUser = await UserModel.findOne({
      where: { email: props.email },
    });

    // if the user exists, throw an error
    if (existingUser) {
      throw new CustomError(409, UserErrorCode.USER_ALREADY_EXISTS);
    }

    // Create company
    const company = await companyService.createCompany({
      name: props.companyName,
    });

    // Create role
    const role = await roleService.createRole({
      name: "Super Admin",
      company: company.id,
    });

    // Create user
    const user = await this.createUser({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
      blocked: false,
      company: company.id,
      roles: [role.id],
    });

    return user;
  }

  async createUser(props: CreateUserProps) {
    // Check if user already exist
    const existingUser = await UserModel.findOne({
      where: { email: props.email },
    });

    // if the user exists, throw an error
    if (existingUser) {
      throw new CustomError(409, UserErrorCode.USER_ALREADY_EXISTS);
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(props.password, 10);
    props.password = encryptedPassword;

    // Create User
    const user = await UserModel.create(props);

    // Assing roles to the new user
    if (props.roles && props.roles.length) {
      await userRoleService.createBulkUserRole({
        user: user.id,
        roles: props.roles,
      });
    }

    return user;
  }

  async updateUser(props: UpdateUserProps) {
    // Props
    const { id, company, password } = props;
    const updateProps = _omit(props, ["id", "company"]);

    // Find user by id and company
    const user = await UserModel.findOne({
      where: { id, company },
    });

    // if user not found, throw an error
    if (!user) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }

    // If the password is provided, then encrypt  it
    if (password) {
      updateProps.password = await bcrypt.hash(password, 10);
    }

    // Finally, update the user
    const [, [updatedUser]] = await UserModel.update(updateProps, {
      where: { id, company },
      returning: true,
    });

    return updatedUser;
  }

  async deleteUser(props: DeleteUserProps) {
    // Props
    const { id, company } = props;

    // Find and delete the user by id and company
    const user = await UserModel.destroy({
      where: { id, company },
    });

    // If no user has been deleted, then throw an error
    if (!user) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }

    return user;
  }

  async getUserById(props: GetUserByIdProps) {
    // Props
    const { id, company } = props;

    // Find  the user by id and company
    const user = await UserModel.findOne({
      where: { id, company },
    });

    // If no user has been found, then throw an error
    if (!user) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }

    return user;
  }

  async getUsers(props: GetUsersProps) {
    // Props
    const { page, pageSize, sort, company, where } = props;

    // Convert props to sequelize compatible props
    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);
    const filters = getFilters(where);

    // Count total users in the given company
    const count = await UserModel.count({
      where: {
        company,
        ...filters,
      },
    });

    // Find all users for matching props and company
    const data = await UserModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters,
      },
      include: [
        {
          model: RoleModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new UserService();
