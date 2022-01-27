import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientDocumentTypeSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const editClientDocumentTypeSchema = wrapSchema({
  params: Joi.object().keys({ clientDocumentTypeId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const deleteClientDocumentTypeSchema = wrapSchema({
  params: Joi.object().keys({
    clientDocumentTypeId: requiredUUIDSchema(),
  }),
});

const getClientDocumentTypeByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientDocumentTypeId: requiredUUIDSchema(),
  }),
});

const getClientDocumentTypeSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientDocumentType: joiMiddleware(createClientDocumentTypeSchema),
  editClientDocumentType: joiMiddleware(editClientDocumentTypeSchema),
  deleteClientDocumentType: joiMiddleware(deleteClientDocumentTypeSchema),
  getClientDocumentTypeById: joiMiddleware(getClientDocumentTypeByIdSchema),
  getClientDocumentTypes: joiMiddleware(getClientDocumentTypeSchema),
};
