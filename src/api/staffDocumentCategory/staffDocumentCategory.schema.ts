import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createStaffDocumentCategorySchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const editStaffDocumentCategorySchema = wrapSchema({
  params: Joi.object().keys({ staffDocumentCategoryId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const deleteStaffDocumentCategorySchema = wrapSchema({
  params: Joi.object().keys({
    staffDocumentCategoryId: requiredUUIDSchema(),
  }),
});

const getStaffDocumentCategoryByIdSchema = wrapSchema({
  params: Joi.object().keys({
    staffDocumentCategoryId: requiredUUIDSchema(),
  }),
});

const getStaffDocumentCategorySchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createStaffDocumentCategory: joiMiddleware(createStaffDocumentCategorySchema),
  editStaffDocumentCategory: joiMiddleware(editStaffDocumentCategorySchema),
  deleteStaffDocumentCategory: joiMiddleware(deleteStaffDocumentCategorySchema),
  getStaffDocumentCategoryById: joiMiddleware(
    getStaffDocumentCategoryByIdSchema
  ),
  getStaffDocumentCategorys: joiMiddleware(getStaffDocumentCategorySchema),
};
