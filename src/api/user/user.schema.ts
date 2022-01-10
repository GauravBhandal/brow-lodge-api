import {
  requiredUUIDSchema,
  wrapSchema,
  joiMiddleware,
} from "../../components/joi/commonSchemas";
import Joi from "joi";

const createUserSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    fullName: Joi.string(),
    email: Joi.string(),
  }),
});

const editUserSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    fullName: Joi.string(),
    email: Joi.string(),
  }),
});

const deleteUserSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
});

const getUserByIdSchema = wrapSchema({
  params: Joi.object().keys({
    userId: requiredUUIDSchema(),
  }),
});

export default {
  createUser: joiMiddleware(createUserSchema),
  editUser: joiMiddleware(editUserSchema),
  deleteUser: joiMiddleware(deleteUserSchema),
  //   getUsers: joiMiddleware(getUserSchema),
  getUserById: joiMiddleware(getUserByIdSchema),
};
