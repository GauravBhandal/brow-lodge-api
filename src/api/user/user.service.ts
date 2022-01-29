import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { omit as _omit } from "lodash";

import UserModel from "./user.model";
import {
  MeProps,
  LoginUserProps,
  RegisterUserProps,
  ForgotPasswordProps,
  ResetPasswordProps,
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
import sendEmail from "../../components/email";
import { StaffProfileModel } from "../staffProfile";
import { CompanyModel } from "../company";

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
        { model: StaffProfileModel, as: "Staff" },
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
          expiresIn: config.TOKEN_EXPIRY,
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

    // Create company TODO: Check the company name and make sure it is unique
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

  async forgotPassword(props: ForgotPasswordProps) {
    // Check if user exist
    const existingUser = await UserModel.findOne({
      where: { email: props.email },
    });

    // if user not found, throw an error
    if (!existingUser) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }

    // Create new password reset token
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordTokenHash = await bcrypt.hash(resetPasswordToken, 10);

    // Update the user and assign the new password reset token
    const [, [updatedUser]] = await UserModel.update(
      {
        resetPasswordToken: resetPasswordTokenHash,
      },
      {
        where: { id: existingUser.id },
        returning: true,
      }
    );

    // Send password reset email to the user. TODO: Use templated and fix the url
    const passwordResetUrl = `${config.BASE_URL}${config.URL_PREFIX}/reset-password?token=${resetPasswordToken}&id=${updatedUser.id}`;
    const emailBody = `
    Hi ${updatedUser.firstName}!
    <br>  
    <br>  
    We are sending you this email because you requested a password reset. Click on the following link to create a new password.
    <br>
    <br>  
    ${passwordResetUrl}
    <br>
    <br>    
    If you didn't request a password reset, you can ignore this email. Your password will not be changed.  
    <br>  
    <br>  
    Best Regards,
    <br>
    Team Care Diary
      `;
    await sendEmail(updatedUser.email, emailBody);

    return { Status: "ok" };
  }

  async resetPassword(props: ResetPasswordProps) {
    const { id, password, resetPasswordToken } = props;

    // Check if user exist
    const user = await UserModel.findOne({
      where: { id },
    });

    // If no user has been found, then throw an error
    if (!user) {
      throw new CustomError(404, UserErrorCode.USER_NOT_FOUND);
    }

    const isValid = await bcrypt.compare(
      resetPasswordToken,
      user.resetPasswordToken
    );

    if (!isValid) {
      throw new CustomError(401, UserErrorCode.INVALID_PASSWORD_RESET_TOKEN);
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const [, [updatedUser]] = await UserModel.update(
      { password: encryptedPassword },
      {
        where: { id },
        returning: true,
      }
    );

    return updatedUser;
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

    // Create new password reset token
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");

    // Create User
    const user = await UserModel.create({ ...props, resetPasswordToken });

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

    // update user role
    if (props.roles && props.roles.length) {
      await userRoleService.updateBulkUserRole({
        user: id,
        roles: props.roles,
      });
    }

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

    // Find the user by id and company
    const user = await UserModel.findOne({
      where: { id, company },
      include: [
        {
          model: RoleModel,
          through: {
            attributes: [],
          },
        },
        {
          model: CompanyModel,
        },
        {
          model: StaffProfileModel,
          as: "Staff",
          required: false,
        },
      ],
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

    const include = [
      {
        model: RoleModel,
        through: {
          attributes: [],
        },
      },
      {
        model: CompanyModel,
      },
      {
        model: StaffProfileModel,
        as: "Staff",
        where: {
          ...filters["Staff"],
        },
        required: false,
      },
    ];

    // Count total users in the given company
    const count = await UserModel.count({
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // Find all users for matching props and company
    const data = await UserModel.findAll({
      offset,
      limit,
      order,
      where: {
        company,
        ...filters["primaryFilters"],
      },
      include,
    });

    // TODO: Clean up getPagingData function
    const response = getPagingData({ count, rows: data }, page, limit);

    return response;
  }
}

export default new UserService();
