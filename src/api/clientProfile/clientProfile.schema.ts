import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientProfileSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    preferredName: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female", "Other").allow(null),
    email: Joi.string().allow("", null),
  }),
});

const editClientProfileSchema = wrapSchema({
  params: Joi.object().keys({
    clientProfileId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    preferredName: Joi.string().required(),
    email: Joi.string().allow("", null),
    dateOfBirth: Joi.date().allow(null),
    gender: Joi.string().valid("Male", "Female", "Other").allow(null),
    personalContactNumber: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    archived: Joi.boolean(),
    attachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
  }),
});

const deleteClientProfileSchema = wrapSchema({
  params: Joi.object().keys({
    clientProfileId: requiredUUIDSchema(),
  }),
});

const getClientProfileSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

const getClientProfileByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientProfileId: requiredUUIDSchema(),
  }),
});

export default {
  createClientProfile: joiMiddleware(createClientProfileSchema),
  editClientProfile: joiMiddleware(editClientProfileSchema),
  deleteClientProfile: joiMiddleware(deleteClientProfileSchema),
  getClientProfiles: joiMiddleware(getClientProfileSchema),
  getClientProfileById: joiMiddleware(getClientProfileByIdSchema),
};
