import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createClientDocumentCategorySchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
    types: Joi.array()
      .items(Joi.string().uuid({ version: "uuidv4" }))
      .required(),
  }),
});

const editClientDocumentCategorySchema = wrapSchema({
  params: Joi.object().keys({ clientDocumentCategoryId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const deleteClientDocumentCategorySchema = wrapSchema({
  params: Joi.object().keys({
    clientDocumentCategoryId: requiredUUIDSchema(),
  }),
});

const getClientDocumentCategoryByIdSchema = wrapSchema({
  params: Joi.object().keys({
    clientDocumentCategoryId: requiredUUIDSchema(),
  }),
});

const getClientDocumentCategorySchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createClientDocumentCategory: joiMiddleware(
    createClientDocumentCategorySchema
  ),
  editClientDocumentCategory: joiMiddleware(editClientDocumentCategorySchema),
  deleteClientDocumentCategory: joiMiddleware(
    deleteClientDocumentCategorySchema
  ),
  getClientDocumentCategoryById: joiMiddleware(
    getClientDocumentCategoryByIdSchema
  ),
  getClientDocumentCategorys: joiMiddleware(getClientDocumentCategorySchema),
};
