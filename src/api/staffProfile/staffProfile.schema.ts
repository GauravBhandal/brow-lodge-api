import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createStaffProfileSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    preferredName: Joi.string().required(),
    email: Joi.string().required(),
    dateOfBirth: Joi.date().allow(null),
    gender: Joi.string().valid("male", "female", "other").allow(null),
    personalContactNumber: Joi.string().allow("", null),
    workContactNumber: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    emergencyContactName: Joi.string().allow("", null),
    emergencyContactPhone: Joi.string().allow("", null),
    emergencyContactRelation: Joi.string().allow("", null),
    jobTitle: Joi.string().allow("", null),
    employmentStartDate: Joi.date().allow(null),
    employmentEndDate: Joi.date().allow(null),
    employmentType: Joi.string().allow("", null),
    manager: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    user: requiredUUIDSchema(),
    attachment: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
  }),
});

const editStaffProfileSchema = wrapSchema({
  params: Joi.object().keys({
    staffProfileId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    preferredName: Joi.string().required(),
    email: Joi.string().required(),
    dateOfBirth: Joi.date().allow(null),
    gender: Joi.string().valid("male", "female", "other").allow(null),
    personalContactNumber: Joi.string().allow("", null),
    workContactNumber: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    emergencyContactName: Joi.string().allow("", null),
    emergencyContactPhone: Joi.string().allow("", null),
    emergencyContactRelation: Joi.string().allow("", null),
    jobTitle: Joi.string().allow("", null),
    employmentStartDate: Joi.date().allow(null),
    employmentEndDate: Joi.date().allow(null),
    employmentType: Joi.string().allow("", null),
    manager: Joi.string().uuid({ version: "uuidv4" }).allow("", null),
    user: requiredUUIDSchema(),
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
