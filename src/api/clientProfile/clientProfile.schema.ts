import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientProfileSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    preferredName: Joi.string().required(),
    email: Joi.string().allow("", null),
    gender: Joi.string().valid("male", "female", "other").allow(null),
    dateOfBirth: Joi.date().allow(null),
    address: Joi.string().allow("", null),
    emergencyContactName: Joi.string().allow("", null),
    emergencyContactPhone: Joi.string().allow("", null),
    emergencyContactRelation: Joi.string().allow("", null),
    height: Joi.number().min(1).allow(null),
    fundingType: Joi.string()
      .valid("ndisManaged", "planManaged", "selfManaged")
      .allow(null),
    ndisNumber: Joi.string().allow("", null),
    medicareNumber: Joi.string().allow("", null),
    privateHealthcareNumber: Joi.string().allow("", null),
    ambulanceNumber: Joi.string().allow("", null),
    serviceStartDate: Joi.date().allow(null),
    serviceEndDate: Joi.date().allow(null),
    attachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
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
    gender: Joi.string().valid("male", "female", "other").allow(null),
    dateOfBirth: Joi.date().allow(null),
    address: Joi.string().allow("", null),
    emergencyContactName: Joi.string().allow("", null),
    emergencyContactPhone: Joi.string().allow("", null),
    emergencyContactRelation: Joi.string().allow("", null),
    height: Joi.number().min(1).allow(null),
    fundingType: Joi.string()
      .valid("ndisManaged", "planManaged", "selfManaged")
      .allow(null),
    ndisNumber: Joi.string().allow("", null),
    medicareNumber: Joi.string().allow("", null),
    privateHealthcareNumber: Joi.string().allow("", null),
    ambulanceNumber: Joi.string().allow("", null),
    serviceStartDate: Joi.date().allow(null),
    serviceEndDate: Joi.date().allow(null),
    archived: Joi.boolean(),
    attachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
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
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientProfile: joiMiddleware(createClientProfileSchema),
  editClientProfile: joiMiddleware(editClientProfileSchema),
  deleteClientProfile: joiMiddleware(deleteClientProfileSchema),
  getClientProfileById: joiMiddleware(getClientProfileByIdSchema),
  getClientProfiles: joiMiddleware(getClientProfileSchema),
};
