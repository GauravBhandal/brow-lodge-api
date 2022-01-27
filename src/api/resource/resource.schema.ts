import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createResourceSchema = wrapSchema({
  body: Joi.object().keys({
    date: Joi.date().required(),
    collectionTypes: Joi.object(),
    type: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().allow("", null),
    link: Joi.string().allow("", null),
    attachment: Joi.string().uuid({ version: "uuidv4" }),
    staff: requiredUUIDSchema(),
  }),
});

const editResourceSchema = wrapSchema({
  params: Joi.object().keys({ resourceId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    date: Joi.date().required(),
    collectionTypes: Joi.object(),
    type: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().allow("", null),
    link: Joi.string().allow("", null),
    attachment: Joi.string().uuid({ version: "uuidv4" }),
    staff: requiredUUIDSchema(),
  }),
});

const deleteResourceSchema = wrapSchema({
  params: Joi.object().keys({
    resourceId: requiredUUIDSchema(),
  }),
});

const getResourceByIdSchema = wrapSchema({
  params: Joi.object().keys({
    resourceId: requiredUUIDSchema(),
  }),
});

const getResourceSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createResource: joiMiddleware(createResourceSchema),
  editResource: joiMiddleware(editResourceSchema),
  deleteResource: joiMiddleware(deleteResourceSchema),
  getResourceById: joiMiddleware(getResourceByIdSchema),
  getResources: joiMiddleware(getResourceSchema),
};
