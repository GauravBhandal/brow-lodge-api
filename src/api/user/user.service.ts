import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "./user.model";
import {
  User,
  LoginUserProps,
  CreateUserProps,
  UpdateUserProps,
} from "./user.types";
import { CustomError } from "../../components/errors";
import UserErrorCode from "./user.error";
import config from "../../config/environment";
import { getPagingParams, getPagingData } from "../../components/paging";
import { getSortingParams } from "../../components/sorting";
import { QueryParams } from "../../common/types";

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

    const user = await UserModel.create(props);
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
