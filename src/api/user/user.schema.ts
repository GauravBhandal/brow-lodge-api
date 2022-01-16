import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const loginUserSchema = wrapSchema({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const registerUserSchema = wrapSchema({
  body: Joi.object().keys({
    companyName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const createUserSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    blocked: Joi.boolean().required(),
  }),
});

const editUserSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    blocked: Joi.boolean(),
  }),
});

const deleteUserSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
});

const getUserSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
  }),
});

const getUserByIdSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
});

export default {
  loginUser: joiMiddleware(loginUserSchema),
  registerUser: joiMiddleware(registerUserSchema),
  createUser: joiMiddleware(createUserSchema),
  editUser: joiMiddleware(editUserSchema),
  deleteUser: joiMiddleware(deleteUserSchema),
  getUsers: joiMiddleware(getUserSchema),
  getUserById: joiMiddleware(getUserByIdSchema),
};
