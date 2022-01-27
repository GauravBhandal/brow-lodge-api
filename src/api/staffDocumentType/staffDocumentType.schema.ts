import Joi from "joi";

import { joiMiddleware } from "../../components/joi/middleware";
import { requiredUUIDSchema, wrapSchema } from "../../common/joiSchemas";

const createStaffDocumentTypeSchema = wrapSchema({
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: requiredUUIDSchema(),
  }),
});

const editStaffDocumentTypeSchema = wrapSchema({
  params: Joi.object().keys({ staffDocumentTypeId: requiredUUIDSchema() }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: requiredUUIDSchema(),
  }),
});

const deleteStaffDocumentTypeSchema = wrapSchema({
  params: Joi.object().keys({
    staffDocumentTypeId: requiredUUIDSchema(),
  }),
});

const getStaffDocumentTypeByIdSchema = wrapSchema({
  params: Joi.object().keys({
    staffDocumentTypeId: requiredUUIDSchema(),
  }),
});

const getStaffDocumentTypeSchema = wrapSchema({
  query: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1),
    sort: Joi.string(),
    where: Joi.any(), //TODO use regular operation for applying schema for where props
  }),
});

export default {
  createStaffDocumentType: joiMiddleware(createStaffDocumentTypeSchema),
  editStaffDocumentType: joiMiddleware(editStaffDocumentTypeSchema),
  deleteStaffDocumentType: joiMiddleware(deleteStaffDocumentTypeSchema),
  getStaffDocumentTypeById: joiMiddleware(getStaffDocumentTypeByIdSchema),
  getStaffDocumentTypes: joiMiddleware(getStaffDocumentTypeSchema),
};
