import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientProfileSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    preferredName: Joi.string().required(),
    email: Joi.string().allow("", null),
    gender: Joi.string().valid("male", "female", "other"),
    dateOfBirth: Joi.date(),
    address: Joi.string(),
    emergencyContactName: Joi.string(),
    emergencyContactPhone: Joi.string(),
    emergencyContactRelation: Joi.string(),
    height: Joi.number().min(1),
  }),
});

const editClientProfileSchema = wrapSchema({
  params: Joi.object().keys({
    clientProfileId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    preferredName: Joi.string(),
    email: Joi.string().allow("", null),
    gender: Joi.string().valid("male", "female", "other"),
    dateOfBirth: Joi.date(),
    address: Joi.string(),
    emergencyContactName: Joi.string(),
    emergencyContactPhone: Joi.string(),
    emergencyContactRelation: Joi.string(),
    height: Joi.number().min(1),
  }),
});

const deleteClientProfileSchema = wrapSchema({
  params: Joi.object().keys({
    clientProfileId: requiredUUIDSchema(),
  }),
});

const getClientProfileByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientProfileId: requiredUUIDSchema(),
  }),
});

const getClientProfileSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
  }),
});

export default {
  createClientProfile: joiMiddleware(createClientProfileSchema),
  editClientProfile: joiMiddleware(editClientProfileSchema),
  deleteClientProfile: joiMiddleware(deleteClientProfileSchema),
  getClientProfileById: joiMiddleware(getClientProfileByIdSchema),
  getClientProfiles: joiMiddleware(getClientProfileSchema),
};
