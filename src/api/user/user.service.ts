import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "./user.model";
import {
  User,
  LoginUserProps,
  RegisterUserProps,
  CreateUserProps,
  UpdateUserProps,
} from "./user.types";
import { CustomError } from "../../components/errors";
import UserErrorCode from "./user.error";
import config from "../../config/environment";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { QueryParams } from "../../common/types";
import { RoleModel, roleService } from "../role";
import { companyService } from "../company";
import { userRoleService } from "./userRole";

class UserService {
  async loginUser(props: LoginUserProps) {
    // Check if user exist with the given email
    const user = await UserModel.findOne({
      where: { email: props.email },
      raw: true,
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
      const token = jwt.sign({ userId: user.id }, config.TOKEN_KEY, {
        expiresIn: "5h",
      });

      // Add the jwtToken to response
      const userWithToken = {
        ...user,
        token,
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
      fullName: props.fullName,
      email: props.fullName,
      password: props.password,
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

  async updateUser(userId: User["id"], props: UpdateUserProps) {
    const user = await UserModel.findOne({ where: { id: userId } });
    if (!user) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }
    const [, [updatedUser]] = await UserModel.update(props, {
      where: { id: userId },
      returning: true,
    });
    return updatedUser;
  }

  async deleteUser(userId: User["id"]) {
    const user = await UserModel.destroy({ where: { id: userId } });
    return user;
  }

  async getUsers(queryParams: QueryParams) {
    const { page, pageSize, sort } = queryParams;

    const { offset, limit } = getPagingParams(page, pageSize);
    const order = getSortingParams(sort);

    const data = await UserModel.findAndCountAll({
      offset,
      limit,
      order,
      include: [
        {
          model: RoleModel,
          through: {
            attributes: [],
          },
        },
      ],
    });

    const response = getPagingData(data, page, limit);

    return response;
  }

  async getUserById(userId: User["id"]) {
    const user = await UserModel.findOne({
      where: { id: userId },
    });
    return user;
  }
}

export default new UserService();
