import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createStaffProfileSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    jobTitle: Joi.string().allow("", null),
    gender: Joi.string().valid("Male", "Female", "Other").allow(null),
    email: Joi.string().allow("", null),
    password: Joi.string().allow("", null),
    blocked: Joi.boolean().required(),
    dateOfBirth: Joi.date().allow(null),
    address: Joi.string().allow("", null),
    roles: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .allow("", null),
  }),
});

const editStaffProfileSchema = wrapSchema({
  params: Joi.object().keys({
    staffProfileId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().allow("", null),
    dateOfBirth: Joi.date().allow(null),
    gender: Joi.string().valid("Male", "Female", "Other").allow(null),
    personalContactNumber: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    jobTitle: Joi.string().allow("", null),
    employmentStartDate: Joi.date().allow(null),
    employmentEndDate: Joi.date().allow(null),
    archived: Joi.boolean(),
    user: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    attachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
  }),
});

const deleteStaffProfileSchema = wrapSchema({
  params: Joi.object().keys({
    staffProfileId: requiredUUIDSchema(),
  }),
});

const getStaffProfileSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

const getStaffProfileByIdSchema = wrapSchema({
  params: Joi.object().keys({
    staffProfileId: requiredUUIDSchema(),
  }),
});

export default {
  createStaffProfile: joiMiddleware(createStaffProfileSchema),
  editStaffProfile: joiMiddleware(editStaffProfileSchema),
  deleteStaffProfile: joiMiddleware(deleteStaffProfileSchema),
  getStaffProfiles: joiMiddleware(getStaffProfileSchema),
  getStaffProfileById: joiMiddleware(getStaffProfileByIdSchema),
};
