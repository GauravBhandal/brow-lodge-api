import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientProfileSchema = wrapSchema({
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
});

const editClientProfileSchema = wrapSchema({
  params: Joi.object().keys({
    clientProfileId: requiredUUIDSchema(),
  }),
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
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
