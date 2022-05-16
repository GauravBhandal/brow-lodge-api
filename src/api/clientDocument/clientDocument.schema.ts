import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientDocumentSchema = wrapSchema({
  body: Joi.object().keys({
    comments: Joi.string().allow("", null),
    hasExpiry: Joi.boolean().required(),
    expiryDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
    category: requiredUUIDSchema(),
    type: requiredUUIDSchema(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const editClientDocumentSchema = wrapSchema({
  params: Joi.object().keys({ clientDocumentId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    comments: Joi.string().allow("", null),
    hasExpiry: Joi.boolean().required(),
    expiryDate: Joi.date().allow(null),
    client: requiredUUIDSchema(),
    category: requiredUUIDSchema(),
    type: requiredUUIDSchema(),
    archived: Joi.boolean(),
    attachments: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const deleteClientDocumentSchema = wrapSchema({
  params: Joi.object().keys({
    clientDocumentId: requiredUUIDSchema(),
  }),
});

const getClientDocumentByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientDocumentId: requiredUUIDSchema(),
  }),
});

const getClientDocumentSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientDocument: joiMiddleware(createClientDocumentSchema),
  editClientDocument: joiMiddleware(editClientDocumentSchema),
  deleteClientDocument: joiMiddleware(deleteClientDocumentSchema),
  getClientDocumentById: joiMiddleware(getClientDocumentByIdSchema),
  getClientDocuments: joiMiddleware(getClientDocumentSchema),
};
