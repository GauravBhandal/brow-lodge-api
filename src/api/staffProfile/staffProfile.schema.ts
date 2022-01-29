import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createStaffProfileSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    preferredName: Joi.string().required(),
    email: Joi.string().required(),
    user: requiredUUIDSchema(),
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
    user: requiredUUIDSchema(),
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
