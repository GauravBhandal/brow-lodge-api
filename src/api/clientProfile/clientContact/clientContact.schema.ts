import Joi from "joi";

import { joiMiddleware } from "../../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../../common/joiSchemas";

const createClientContactSchema = wrapSchema({
  body: Joi.object().keys({
    type: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    address: Joi.string().allow("", null),
    email: Joi.string().allow("", null),
    phone: Joi.string().allow("", null),
  }),
});

const editClientContactSchema = wrapSchema({
  params: Joi.object().keys({ clientContactId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    type: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    address: Joi.string().allow("", null),
    email: Joi.string().allow("", null),
    phone: Joi.string().allow("", null),
  }),
});

const deleteClientContactSchema = wrapSchema({
  params: Joi.object().keys({
    clientContactId: requiredUUIDSchema(),
  }),
});

const getClientContactByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientContactId: requiredUUIDSchema(),
  }),
});

const getClientContactSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientContact: joiMiddleware(createClientContactSchema),
  editClientContact: joiMiddleware(editClientContactSchema),
  deleteClientContact: joiMiddleware(deleteClientContactSchema),
  getClientContactById: joiMiddleware(getClientContactByIdSchema),
  getClientContacts: joiMiddleware(getClientContactSchema),
};
